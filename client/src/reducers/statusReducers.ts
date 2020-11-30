import {
    SET_STATUS,
    CHALLENGE_USER,
    GET_CHALLENGED,
    StatusActionTypes,
    Status,
    SET_ID,
} from "../constants/statusConstants";
import { User } from "../constants/userConstants";

export interface StatusStateInterface {
    id: string;
    status: Status;
    opponent: User | null;
}

export const initialState: StatusStateInterface = {
    id: "",
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
        default:
            return state;
    }
};
