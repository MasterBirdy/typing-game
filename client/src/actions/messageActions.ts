import {
    SET_ERROR,
    SET_MESSAGE,
    RESET_ALL_MESSAGE,
    MESSAGE_WITH_ACTION,
    MessageActionTypes,
} from "../constants/messageConstants";

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

export const createMessageWithAction = (
    message: string,
    button: { name: string; onClick: Function }
): MessageActionTypes => {
    return {
        type: MESSAGE_WITH_ACTION,
        payload: {
            message,
            button,
        },
    };
};
