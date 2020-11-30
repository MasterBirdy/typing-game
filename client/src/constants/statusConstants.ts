import { User } from "./userConstants";

export const SET_STATUS = "SET_STATUS";
export const SET_ID = "SET_ID";
export const CHALLENGE_USER = "CHALLENGE_USER";
export const GET_CHALLENGED = "GET_CHALLENGED";

export enum Status {
    IDLE = "Idle",
    WAITING = "Waiting",
    CHALLENGED = "Challenged",
    PLAYING = "Playing",
}

interface SetIdAction {
    type: typeof SET_ID;
    payload: string;
}

interface SetStatusAction {
    type: typeof SET_STATUS;
    payload: Status;
}

interface ChallengeUserAction {
    type: typeof CHALLENGE_USER;
    payload: User;
}

interface GetChallengedAction {
    type: typeof GET_CHALLENGED;
    payload: User;
}

export type StatusActionTypes = SetIdAction | SetStatusAction | ChallengeUserAction | GetChallengedAction;
