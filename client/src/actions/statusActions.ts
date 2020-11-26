import { SET_STATUS, Status, StatusActionTypes } from "../constants/statusConstants";

export const changeStatus = (status: Status): StatusActionTypes => {
    return {
        type: SET_STATUS,
        payload: status,
    };
};
