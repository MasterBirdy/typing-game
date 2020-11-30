import {
    SET_STATUS,
    CHALLENGE_USER,
    GET_CHALLENGED,
    Status,
    StatusActionTypes,
    SET_ID,
} from "../constants/statusConstants";
import { User } from "../constants/userConstants";

export const setID = (id: string): StatusActionTypes => {
    return {
        type: SET_ID,
        payload: id,
    };
};

export const changeStatus = (status: Status): StatusActionTypes => {
    return {
        type: SET_STATUS,
        payload: status,
    };
};

export const challengeUser = (opponent: User): StatusActionTypes => {
    return {
        type: CHALLENGE_USER,
        payload: opponent,
    };
};

// place to put status: challenged
export const getChallenged = (opponent: User): StatusActionTypes => {
    return {
        type: GET_CHALLENGED,
        payload: opponent,
    };
};
