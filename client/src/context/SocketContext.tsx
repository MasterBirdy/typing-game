import React, { useEffect, createContext } from "react";
import io from "socket.io-client";
import { addUser, deleteUser, setUsersList } from "../actions/userActions";
import { changeStatus, challengeUser, getChallenged, setID, setName, resetOpponent } from "../actions/statusActions";
import {
    typeCharacter,
    updateOpponentGameData,
    updateTimeGame,
    gameStart,
    gameWon,
    stopGame,
} from "../actions/gameActions";
import { setMessage, createMessageWithAction, resetAllMessage, setError } from "../actions/messageActions";
import { Status } from "../constants/statusConstants";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../constants/userConstants";
import { socketConstants } from "../constants/socketConstants";
import { useHistory } from "react-router-dom";
import { ApplicationState } from "../store";
import { OpponentData } from "../constants/gameConstants";
const socket = io("http://localhost:5000");

export interface SocketContextInterface {
    id: string;
    challenge: (s: User) => void;
    acceptInvite: (s: string) => void;
    typeACharacter: (s: string) => void;
    updateGame: (s: string) => void;
    setMyName: (s: string) => void;
    leaveGame: () => void;
}

export const SocketContext = createContext<SocketContextInterface | null>(null);

interface SocketProviderInterface {
    children: React.ReactNode;
}

const {
    USERS_LIST,
    ADD_USER,
    DELETE_USER,
    CHALLENGE_USER,
    SET_ID,
    CHANGE_NAME,
    SET_NAME,
    SET_STATUS,
    USER_CHALLENGED,
    ACCEPT_CHALLENGE,
    CANCEL_CHALLENGE,
    START_GAME,
    UPDATE_GAME,
    GAME_UPDATED,
    GAME_WON,
    TYPE_CHARACTER,
    OPPONENT_LEFT,
    OPPONENT_DISCONNECTED,
} = socketConstants;

export const SocketProvider = ({ children }: SocketProviderInterface) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const gameState = useSelector((state: ApplicationState) => state.game);
    const { typingPrompt, yourActions } = gameState;
    useEffect(() => {
        socket.on(SET_ID, (data: string) => {
            dispatch(setID(data));
        });

        socket.on(SET_NAME, (data: string) => {
            dispatch(setName(data));
        });

        socket.on(USERS_LIST, (data: { [key: string]: User }) => {
            dispatch(setUsersList(data));
        });

        socket.on(ADD_USER, (data: User) => {
            dispatch(addUser(data));
        });

        socket.on(DELETE_USER, (data: string) => {
            dispatch(deleteUser(data));
        });

        socket.on(USER_CHALLENGED, (data: User) => {
            dispatch(getChallenged(data));
            dispatch(
                createMessageWithAction(`${data.name} has challenged you to a fight!`, {
                    name: "Accept",
                    onClick: () => {
                        acceptInvite(data.id);
                    },
                })
            );
        });

        socket.on(SET_STATUS, (data: Status) => {
            dispatch(changeStatus(data));
        });

        socket.on(GAME_UPDATED, (data: OpponentData) => {
            dispatch(updateOpponentGameData(data));
        });

        socket.on(START_GAME, (time: number, prompt: string) => {
            dispatch(changeStatus(Status.PLAYING));
            dispatch(resetAllMessage());
            dispatch(gameStart(time, prompt));
            history.push("/game");
        });

        socket.on(GAME_WON, (winner: string) => {
            dispatch(gameWon(winner === socket.id));
            dispatch(
                createMessageWithAction(`Game has finished! Click here to leave the room.`, {
                    name: "Leave",
                    onClick: () => {
                        history.push("/");
                        dispatch(resetAllMessage());
                    },
                })
            );
        });

        socket.on(OPPONENT_DISCONNECTED, (message: string) => {
            dispatch(stopGame());
            dispatch(resetOpponent());
            dispatch(setMessage(""));
            dispatch(setError(message));
        });
    }, [history]);

    const challenge = (opponent: User) => {
        socket.emit(CHALLENGE_USER, opponent.id);
        dispatch(challengeUser(opponent));
        dispatch(
            createMessageWithAction(`You have challenged ${opponent.name} to a fight!`, {
                name: "Cancel",
                onClick: () => {
                    dispatch(setMessage(""));
                    socket.emit(CANCEL_CHALLENGE);
                },
            })
        );
    };

    const acceptInvite = (opponent: string) => {
        socket.emit(ACCEPT_CHALLENGE, opponent);
        dispatch(resetAllMessage());
    };

    const typeACharacter = (typedString: string) => {
        socket.emit(TYPE_CHARACTER, typedString, yourActions);
        dispatch(typeCharacter(typedString, typingPrompt));
    };

    const updateGame = (opponent: string) => {
        socket.emit(UPDATE_GAME, opponent);
        dispatch(updateTimeGame());
    };

    const leaveGame = () => {
        socket.emit(OPPONENT_LEFT);
        dispatch(stopGame());
        dispatch(resetOpponent());
    };

    const setMyName = (name: string) => {
        socket.emit(CHANGE_NAME, name);
        dispatch(setName(name));
        dispatch(
            createMessageWithAction(`Name changed to ${name}.`, {
                name: "Accept",
                onClick: () => {
                    dispatch(setMessage(""));
                },
            })
        );
    };

    return (
        <SocketContext.Provider
            value={{ id: socket.id, challenge, acceptInvite, typeACharacter, updateGame, setMyName, leaveGame }}
        >
            {children}
        </SocketContext.Provider>
    );
};
