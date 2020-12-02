import { User } from "./userConstants";

export const SET_STATUS = "SET_STATUS";
export const SET_ID = "SET_ID";
export const SET_NAME = "SET_NAME";
export const CHALLENGE_USER = "CHALLENGE_USER";
export const GET_CHALLENGED = "GET_CHALLENGED";
export const RESET_OPPONENT = "RESET_OPPONENT";

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

interface SetNameAction {
    type: typeof SET_NAME;
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

interface ResetOpponentAction {
    type: typeof RESET_OPPONENT;
}

export type StatusActionTypes =
    | SetIdAction
    | SetNameAction
    | SetStatusAction
    | ChallengeUserAction
    | GetChallengedAction
    | ResetOpponentAction;
