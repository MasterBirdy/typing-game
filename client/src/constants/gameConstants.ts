export const TYPE_CHARACTER = "TYPE_CHARACTER";
export const SET_TIME = "SET_TIME";
export const UPDATE_TIME_GAME = "UPDATE_TIME_GAME";
export const UPDATE_OPPONENT_GAME_DATA = "UPDATE_OPPONENT_GAME_DATA";
export const INCREMENT_ACTION_COUNTER = "INCREMENT_ACTION_COUNTER";
export const START_THE_GAME = "START_THE_GAME";
export const WON_THE_GAME = "WON_THE_GAME";
export const STOP_THE_GAME = "STOP_THE_GAME";

export interface OpponentData {
    opponentTyping: string;
    opponentActions: number;
}

interface TypeCharacterAction {
    type: typeof TYPE_CHARACTER;
    payload: {
        sliceNumber: number;
        incorrect: boolean;
        yourTyping: string;
    };
}

interface SetTimeAction {
    type: typeof SET_TIME;
    payload: number;
}

interface UpdateTimeGameAction {
    type: typeof UPDATE_TIME_GAME;
    payload: number;
}

interface UpdateOpponentGameDataAction {
    type: typeof UPDATE_OPPONENT_GAME_DATA;
    payload: OpponentData;
}

interface IncrementActionCounter {
    type: typeof INCREMENT_ACTION_COUNTER;
}

interface StartGameAction {
    type: typeof START_THE_GAME;
    payload: {
        time: number;
        prompt: string;
    };
}
interface GameWonAction {
    type: typeof WON_THE_GAME;
    payload: boolean;
}

interface StopGameAction {
    type: typeof STOP_THE_GAME;
}

export type GameActionTypes =
    | TypeCharacterAction
    | SetTimeAction
    | UpdateTimeGameAction
    | UpdateOpponentGameDataAction
    | IncrementActionCounter
    | StartGameAction
    | GameWonAction
    | StopGameAction;
