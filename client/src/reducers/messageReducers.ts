import { SET_MESSAGE, SET_ERROR, RESET_ALL_MESSAGE, MessageActionTypes } from "../constants/messageConstants";

export interface MessageStateInterface {
    message: string;
    error?: string;
}

export const initialState: MessageStateInterface = {
    message: "",
};

export const messageReducer = (state = initialState, action: MessageActionTypes): MessageStateInterface => {
    switch (action.type) {
        case SET_MESSAGE:
            return { ...state, message: action.payload };
        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case RESET_ALL_MESSAGE:
            return {
                message: "",
            };
        default:
            return state;
    }
};
