import {
    SET_ERROR,
    SET_MESSAGE,
    RESET_ERROR,
    RESET_ALL_MESSAGE,
    MESSAGE_WITH_ACTION,
    MessageActionTypes,
} from "../constants/messageConstants";

/**
 * Sets a message or resets it.
 * @param message String of message. If blank string, it will make the
 * message window no longer visible.
 */

export const setMessage = (message: string): MessageActionTypes => {
    return {
        type: SET_MESSAGE,
        payload: message,
    };
};

/**
 * Sets an error message.
 * @param error Error message string.
 */
export const setError = (error: string): MessageActionTypes => {
    return {
        type: SET_ERROR,
        payload: error,
    };
};

/**
 * Resets error message.
 */
export const resetError = (): MessageActionTypes => {
    return {
        type: RESET_ERROR,
    };
};

/**
 * Resets both message state and error message state.
 */
export const resetAllMessage = (): MessageActionTypes => {
    return {
        type: RESET_ALL_MESSAGE,
    };
};

/**
 * Creates a message with an button that does a specified action
 * when clicked.
 * @param message Message string for message.
 * @param button Object with a button name and a onClick function that does something
 * when it is clicked.
 */
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
