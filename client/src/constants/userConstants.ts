export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const SET_USERS_LIST = "SET_USERS_LIST";

interface AddUserAction {
    type: typeof ADD_USER;
    payload: string;
}

interface DeleteUserAction {
    type: typeof DELETE_USER;
    payload: string;
}

interface SetUsersListAction {
    type: typeof SET_USERS_LIST;
    payload: string[];
}

export type UserActionTypes = AddUserAction | DeleteUserAction | SetUsersListAction;
