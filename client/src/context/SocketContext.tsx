import React, { useEffect, createContext } from "react";
import io from "socket.io-client";
import { addUser, deleteUser, setUsersList } from "../actions/userActions";
import { changeStatus, challengeUser } from "../actions/statusActions";
import { typeCharacter } from "../actions/gameActions";
import { Status } from "../constants/statusConstants";
import { useDispatch, useSelector } from "react-redux";
import { socketConstants } from "../constants/socketConstants";
import { useHistory } from "react-router-dom";
import { ApplicationState } from "../store";
const socket = io("http://localhost:5000");

export interface SocketContextInterface {
    challenge: (s: string) => void;
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
    INVITE_USER,
    SET_STATUS,
    USER_INVITED,
    ACCEPT_INVITE,
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
        socket.on(USERS_LIST, (data: string[]) => {
            dispatch(setUsersList(data));
        });

        socket.on(ADD_USER, (data: string) => {
            dispatch(addUser(data));
        });

        socket.on(DELETE_USER, (data: string) => {
            dispatch(deleteUser(data));
        });

        socket.on(USER_INVITED, (data: string) => {
            // temporary for putting opponent data into challenge status
            dispatch(challengeUser(data));
        });

        socket.on(SET_STATUS, (data: Status) => {
            dispatch(changeStatus(data));
        });

        socket.on(GAME_WON, () => {
            console.log("Game Won!");
        });

        socket.on(START_GAME, () => {
            dispatch(changeStatus(Status.PLAYING));
            history.push("/game");
        });
    }, [history]);

    const challenge = (opponent: string) => {
        socket.emit(INVITE_USER, opponent);
        dispatch(challengeUser(opponent));
    };

    const acceptInvite = (opponent: string) => {
        socket.emit(ACCEPT_INVITE, opponent);
    };

    const typeACharacter = (typedString: string) => {
        console.log("hello?");
        socket.emit(TYPE_CHARACTER, typedString);
        dispatch(typeCharacter(typedString, typingPrompt));
    };

    return (
        <SocketContext.Provider value={{ challenge, acceptInvite, typeACharacter }}>{children}</SocketContext.Provider>
    );
};
