import { SET_STATUS, StatusActionTypes, Status } from "../constants/statusConstants";

export interface StatusStateInterface {
    status: Status;
}

export const initialState: StatusStateInterface = {
    status: Status.IDLE,
};

export const statusReducer = (state = initialState, action: StatusActionTypes) => {
    switch (action.type) {
        case SET_STATUS:
            return {
                status: action.payload,
            };
        default:
            return state;
    }
};
