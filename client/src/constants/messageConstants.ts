export const SET_MESSAGE = "SET_MESSAGE";
export const SET_ERROR = "SET_ERROR";
export const RESET_ALL_MESSAGE = "RESET_ALL_MESSAGE";

interface SetMessageAction {
    type: typeof SET_MESSAGE;
    payload: string;
}

interface SetErrorAction {
    type: typeof SET_ERROR;
    payload: string;
}

interface ResetAllMessageAction {
    type: typeof RESET_ALL_MESSAGE;
}

export type MessageActionTypes = SetMessageAction | SetErrorAction | ResetAllMessageAction;
