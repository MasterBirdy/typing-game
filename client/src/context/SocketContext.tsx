import React, { useEffect, createContext } from "react";
import io from "socket.io-client";
import { addUser, setUsersList } from "../actions/userActions";
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

const ENDPOINT = `${
    process.env.NODE_ENV === "production" ? process.env.REACT_APP_PROD_SOCKET : process.env.REACT_APP_DEV_SOCKET
}`;

const socket = io(ENDPOINT);

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
        /**
         * Sets Socket ID in Redux State
         */
        socket.on(SET_ID, (data: string) => {
            dispatch(setID(data));
        });

        /**
         * Sets name given from Socket into Redux State
         */
        socket.on(SET_NAME, (data: string) => {
            dispatch(setName(data));
        });

        /**
         * Every time a user join the server, a user changes
         * their status, or a user disconnects, a user list object is given
         * to all users to update accordingly.
         */
        socket.on(USERS_LIST, (data: { [key: string]: User }) => {
            dispatch(setUsersList(data));
        });

        /**
         * Adds a new user to the user list.
         */
        socket.on(ADD_USER, (data: User) => {
            dispatch(addUser(data));
        });

        /**
         * Action that occurs when you are challenged to a fight
         * by another user. Status is changed to CHALLENGED and
         * creates a message.
         */
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

        /**
         * Changes a user's status if requested by the server.
         */
        socket.on(SET_STATUS, (data: Status) => {
            dispatch(changeStatus(data));
        });

        /**
         * After a user accepts a challenge and receives this command
         * from the server, this sends both users into game mode.
         */

        socket.on(START_GAME, (time: number, prompt: string) => {
            dispatch(changeStatus(Status.PLAYING));
            dispatch(resetAllMessage());
            dispatch(gameStart(time, prompt));
            history.push("/game");
        });

        /**
         * When receiving a update from the server about opponent data,
         * this method fires off to send to Redux State.
         */
        socket.on(GAME_UPDATED, (data: OpponentData) => {
            dispatch(updateOpponentGameData(data));
        });

        /**
         * When a server decides that someone has won a game, all users playing
         * will receive this command and update the game state accordingly.
         */
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

        /**
         * If a user disconnects while either you are challenging him, being challenged,
         * or playing a game, this fires off with the appropriate message.
         */
        socket.on(OPPONENT_DISCONNECTED, (message: string) => {
            dispatch(stopGame());
            dispatch(resetOpponent());
            dispatch(setMessage(""));
            dispatch(setError(message));
        });
        /* eslint-disable-next-line */
    }, [history, dispatch]);

    /**
     * Send a challenge to an opponent from the user list
     * @param opponent User object from the user list
     */
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

    /**
     * Accepts a challenge from an opponent who challenged you
     * @param opponent ID of opponent who challenged you
     */
    const acceptInvite = (opponent: string) => {
        socket.emit(ACCEPT_CHALLENGE, opponent);
        dispatch(resetAllMessage());
    };

    /**
     * Sends the current string that you've typed in game to the server
     * @param typedString Current string input in game
     */
    const typeACharacter = (typedString: string) => {
        socket.emit(TYPE_CHARACTER, typedString, yourActions);
        dispatch(typeCharacter(typedString, typingPrompt));
    };

    /**
     * Requests a server update of the opponent's data in game
     * @param opponent ID of opponent in game
     */
    const updateGame = (opponent: string) => {
        socket.emit(UPDATE_GAME, opponent);
        dispatch(updateTimeGame());
    };

    /**
     * If leaving a game early, tells the server to tell your opponent that
     * you have left.
     */
    const leaveGame = () => {
        socket.emit(OPPONENT_LEFT);
        dispatch(stopGame());
        dispatch(resetOpponent());
    };

    /**
     * Changes name in server.
     * @param name String of requested name change
     */
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
