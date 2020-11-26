import { ADD_USER, DELETE_USER, SET_USERS_LIST, UserActionTypes } from "../constants/userConstants";

export const setUsersList = (users: string[]): UserActionTypes => {
    return {
        type: SET_USERS_LIST,
        payload: users,
    };
};

export const addUser = (user: string): UserActionTypes => {
    return {
        type: ADD_USER,
        payload: user,
    };
};

export const deleteUser = (user: string): UserActionTypes => {
    return {
        type: DELETE_USER,
        payload: user,
    };
};
