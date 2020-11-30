import { ADD_USER, DELETE_USER, SET_USERS_LIST, UserActionTypes, User } from "../constants/userConstants";

export const setUsersList = (users: { [key: string]: User }): UserActionTypes => {
    return {
        type: SET_USERS_LIST,
        payload: users,
    };
};

export const addUser = (user: User): UserActionTypes => {
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
