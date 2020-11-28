export const SET_STATUS = "SET_STATUS";
export const CHALLENGE_USER = "CHALLENGE_USER";

export enum Status {
    IDLE = "Idle",
    WAITING = "Waiting",
    PLAYING = "Playing",
}

interface SetStatusAction {
    type: typeof SET_STATUS;
    payload: Status;
}

interface ChallengeUserAction {
    type: typeof CHALLENGE_USER;
    payload: string;
}

export type StatusActionTypes = SetStatusAction | ChallengeUserAction;
