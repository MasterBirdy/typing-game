import {
    SET_STATUS,
    CHALLENGE_USER,
    GET_CHALLENGED,
    RESET_OPPONENT,
    StatusActionTypes,
    Status,
    SET_ID,
    SET_NAME,
} from "../constants/statusConstants";
import { User } from "../constants/userConstants";

export interface StatusStateInterface {
    id: string;
    name: string;
    status: Status;
    opponent: User | null;
}

export const initialState: StatusStateInterface = {
    id: "",
    name: "",
    status: Status.IDLE,
    opponent: null,
};

export const statusReducer = (state = initialState, action: StatusActionTypes): StatusStateInterface => {
    switch (action.type) {
        case SET_ID:
            return {
                ...state,
                id: action.payload,
            };
        case SET_NAME:
            return {
                ...state,
                name: action.payload,
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.payload,
            };
        case CHALLENGE_USER:
            return {
                ...state,
                status: Status.WAITING,
                opponent: action.payload,
            };
        case GET_CHALLENGED:
            return {
                ...state,
                status: Status.CHALLENGED,
                opponent: action.payload,
            };
        case RESET_OPPONENT:
            return {
                ...state,
                status: Status.IDLE,
                opponent: null,
            };
        default:
            return state;
    }
};
