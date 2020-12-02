import {
    SET_MESSAGE,
    SET_ERROR,
    RESET_ALL_MESSAGE,
    MESSAGE_WITH_ACTION,
    MessageActionTypes,
    RESET_ERROR,
} from "../constants/messageConstants";

export interface MessageStateInterface {
    message: string;
    error?: string;
    button: {
        name: string;
        onClick: Function;
    };
    errorOnClick: Function;
}

export const initialState: MessageStateInterface = {
    message: "",
    button: {
        name: "",
        onClick: () => {},
    },
    errorOnClick: () => {},
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
        case RESET_ERROR:
            return {
                ...state,
                error: "",
            };
        case MESSAGE_WITH_ACTION:
            return {
                ...state,
                message: action.payload.message,
                button: action.payload.button,
            };
        case RESET_ALL_MESSAGE:
            return {
                message: "",
                button: {
                    name: "",
                    onClick: () => {},
                },
                errorOnClick: () => {},
            };
        default:
            return state;
    }
};
