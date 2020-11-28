import { SET_STATUS, CHALLENGE_USER, StatusActionTypes, Status } from "../constants/statusConstants";

export interface StatusStateInterface {
    status: Status;
    opponent: string | null;
}

export const initialState: StatusStateInterface = {
    status: Status.IDLE,
    opponent: null,
};

export const statusReducer = (state = initialState, action: StatusActionTypes): StatusStateInterface => {
    switch (action.type) {
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
        default:
            return state;
    }
};
