import { SET_ERROR, SET_MESSAGE, RESET_ALL_MESSAGE, MessageActionTypes } from "../constants/messageConstants";

export const setMessage = (message: string): MessageActionTypes => {
    return {
        type: SET_MESSAGE,
        payload: message,
    };
};

export const setError = (error: string): MessageActionTypes => {
    return {
        type: SET_ERROR,
        payload: error,
    };
};

export const resetAllMessage = (): MessageActionTypes => {
    return {
        type: RESET_ALL_MESSAGE,
    };
};
