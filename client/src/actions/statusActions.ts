import { SET_STATUS, CHALLENGE_USER, Status, StatusActionTypes } from "../constants/statusConstants";

export const changeStatus = (status: Status): StatusActionTypes => {
    return {
        type: SET_STATUS,
        payload: status,
    };
};

export const challengeUser = (opponent: string): StatusActionTypes => {
    return {
        type: CHALLENGE_USER,
        payload: opponent,
    };
};

// place to put status: challenged

export const getChallenged = (opponent: string) => {};
