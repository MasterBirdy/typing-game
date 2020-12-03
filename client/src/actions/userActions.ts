import { ADD_USER, SET_USERS_LIST, UserActionTypes, User } from "../constants/userConstants";

/**
 * Sets the users list in state
 * @param users Object with users ids as keys and user objects as values
 */

export const setUsersList = (users: { [key: string]: User }): UserActionTypes => {
    return {
        type: SET_USERS_LIST,
        payload: users,
    };
};

/**
 * Adds a new user to the users list
 * @param user User object
 */

export const addUser = (user: User): UserActionTypes => {
    return {
        type: ADD_USER,
        payload: user,
    };
};
