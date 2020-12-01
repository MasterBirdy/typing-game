import {
    TYPE_CHARACTER,
    SET_TIME,
    GameActionTypes,
    UPDATE_TIME_GAME,
    UPDATE_OPPONENT_GAME_DATA,
    INCREMENT_ACTION_COUNTER,
    START_THE_GAME,
} from "../constants/gameConstants";

export interface GameStateInterface {
    typingPrompt: string;
    yourTyping: string;
    opponentTyping: string;
    yourActions: number;
    opponentActions: number;
    timeStarted: number;
    currentTime: number;
    sliceNumber: number;
    incorrect: boolean;
    gameWon: boolean;
}

export const intitalState: GameStateInterface = {
    typingPrompt: "Peter Piper picked a peck of pickled peppers.",
    yourTyping: "",
    opponentTyping: "",
    yourActions: 0,
    opponentActions: 0,
    timeStarted: 0,
    currentTime: 0,
    sliceNumber: 0,
    incorrect: false,
    gameWon: false,
};

export const gameReducer = (state = intitalState, action: GameActionTypes): GameStateInterface => {
    switch (action.type) {
        case SET_TIME:
            return {
                ...state,
                timeStarted: action.payload,
                currentTime: action.payload + 1,
            };
        case TYPE_CHARACTER:
            return {
                ...state,
                yourTyping: action.payload.yourTyping,
                incorrect: action.payload.incorrect,
                sliceNumber: action.payload.sliceNumber,
            };
        case UPDATE_TIME_GAME:
            return {
                ...state,
                currentTime: action.payload,
            };
        case UPDATE_OPPONENT_GAME_DATA:
            return {
                ...state,
                opponentTyping: action.payload.opponentTyping,
                opponentActions: action.payload.opponentActions,
            };
        case INCREMENT_ACTION_COUNTER:
            return {
                ...state,
                yourActions: state.yourActions + 1,
            };
        case START_THE_GAME:
            return {
                ...state,
                timeStarted: action.payload.time,
                currentTime: action.payload.time + 1,
                typingPrompt: action.payload.prompt,
                yourActions: 0,
                opponentActions: 0,
                sliceNumber: 0,
                incorrect: false,
                gameWon: false,
            };
        default:
            return state;
    }
};
