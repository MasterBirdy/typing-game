import {
    SET_STATUS,
    CHALLENGE_USER,
    GET_CHALLENGED,
    Status,
    StatusActionTypes,
    SET_ID,
    RESET_OPPONENT,
    SET_NAME,
} from "../constants/statusConstants";
import { User } from "../constants/userConstants";

/**
 * Sets Socket id for state.
 * @param id ID string from server
 */
export const setID = (id: string): StatusActionTypes => {
    return {
        type: SET_ID,
        payload: id,
    };
};

/**
 * Sets name for state.
 * @param name Name string
 */
export const setName = (name: string): StatusActionTypes => {
    return {
        type: SET_NAME,
        payload: name,
    };
};

/**
 * Changes play status (IDLE, WAITING, CHALLENGED, PLAYING)
 * @param status Game status
 */
export const changeStatus = (status: Status): StatusActionTypes => {
    return {
        type: SET_STATUS,
        payload: status,
    };
};

/**
 * Changes status to WAITING and specifies which opponent that you challenged.
 * @param opponent User object
 */
export const challengeUser = (opponent: User): StatusActionTypes => {
    return {
        type: CHALLENGE_USER,
        payload: opponent,
    };
};

/**
 * Changes status to CHALLENGED and specifies which opponent challenged you.
 * @param opponent User object
 */
export const getChallenged = (opponent: User): StatusActionTypes => {
    return {
        type: GET_CHALLENGED,
        payload: opponent,
    };
};

/**
 * Resets opponent back to null and changes your status to IDLE.
 */
export const resetOpponent = (): StatusActionTypes => {
    return {
        type: RESET_OPPONENT,
    };
};
