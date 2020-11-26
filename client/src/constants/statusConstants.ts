export const SET_STATUS = "SET_STATUS";

export enum Status {
    IDLE = "Idle",
    WAITING = "Waiting",
    PLAYING = "Playing",
}

interface SetStatusAction {
    type: typeof SET_STATUS;
    payload: Status;
}

export type StatusActionTypes = SetStatusAction;
