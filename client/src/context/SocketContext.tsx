import React, { useEffect, createContext } from "react";
import io from "socket.io-client";
import { addUser, deleteUser, setUsersList } from "../actions/userActions";
import { changeStatus, challengeUser, getChallenged, setID } from "../actions/statusActions";
import { typeCharacter } from "../actions/gameActions";
import { setMessage, createMessageWithAction, resetAllMessage } from "../actions/messageActions";
import { Status } from "../constants/statusConstants";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../constants/userConstants";
import { socketConstants } from "../constants/socketConstants";
import { useHistory } from "react-router-dom";
import { ApplicationState } from "../store";
const socket = io("http://localhost:5000");

export interface SocketContextInterface {
    id: string;
    challenge: (s: User) => void;
    acceptInvite: (s: string) => void;
    typeACharacter: (s: string) => void;
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
    SET_STATUS,
    USER_CHALLENGED,
    ACCEPT_CHALLENGE,
    START_GAME,
    GAME_WON,
    TYPE_CHARACTER,
} = socketConstants;

export const SocketProvider = ({ children }: SocketProviderInterface) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const gameState = useSelector((state: ApplicationState) => state.game);
    const { typingPrompt } = gameState;
    useEffect(() => {
        socket.on(SET_ID, (data: string) => {
            dispatch(setID(data));
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

        socket.on(GAME_WON, () => {
            console.log("Game Won!");
        });

        socket.on(START_GAME, () => {
            dispatch(changeStatus(Status.PLAYING));
            dispatch(setMessage(""));
            history.push("/game");
        });
    }, [history]);

    const challenge = (opponent: User) => {
        socket.emit(CHALLENGE_USER, opponent.id);
        dispatch(challengeUser(opponent));
        dispatch(
            createMessageWithAction(`You have challenged ${opponent.name} to a fight!`, {
                name: "Cancel",
                onClick: () => {
                    dispatch(resetAllMessage());
                },
            })
        );
    };

    const acceptInvite = (opponent: string) => {
        socket.emit(ACCEPT_CHALLENGE, opponent);
        dispatch(resetAllMessage());
    };

    const typeACharacter = (typedString: string) => {
        socket.emit(TYPE_CHARACTER, typedString);
        dispatch(typeCharacter(typedString, typingPrompt));
    };

    return (
        <SocketContext.Provider value={{ id: socket.id, challenge, acceptInvite, typeACharacter }}>
            {children}
        </SocketContext.Provider>
    );
};
