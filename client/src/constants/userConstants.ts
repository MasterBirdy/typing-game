import { Status } from "./statusConstants";

export const ADD_USER = "ADD_USER";
export const SET_USERS_LIST = "SET_USERS_LIST";

export interface User {
    name: string;
    id: string;
    status: Status;
}

interface AddUserAction {
    type: typeof ADD_USER;
    payload: User;
}

interface SetUsersListAction {
    type: typeof SET_USERS_LIST;
    payload: { [key: string]: User };
}

export type UserActionTypes = AddUserAction | SetUsersListAction;
