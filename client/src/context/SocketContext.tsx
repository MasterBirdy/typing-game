import React, { useEffect, createContext } from "react";
import io from "socket.io-client";
import { addUser, deleteUser, setUsersList } from "../actions/userActions";
import { changeStatus } from "../actions/statusActions";
import { Status } from "../constants/statusConstants";
import { useDispatch, useSelector } from "react-redux";
import { socketConstants } from "../constants/socketConstants";
import { ApplicationState } from "../store";
const socket = io("http://localhost:5000");

interface SocketContextInterface {
    inviteUser: () => void;
}

export const SocketContext = createContext<SocketContextInterface | null>(null);

interface SocketProviderInterface {
    children: React.ReactNode;
}

const { USERS_LIST, ADD_USER, DELETE_USER, INVITE_USER, SET_STATUS } = socketConstants;

export const SocketProvider = ({ children }: SocketProviderInterface) => {
    const dispatch = useDispatch();

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

        socket.on(SET_STATUS, (data: Status) => {
            dispatch(changeStatus(data));
        });
    }, []);

    const inviteUser = () => {
        socket.emit(INVITE_USER, "");
    };

    return <SocketContext.Provider value={{ inviteUser }}>{children}</SocketContext.Provider>;
};
