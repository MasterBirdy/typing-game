import { TYPE_CHARACTER, GameActionTypes } from "../constants/gameConstants";

export interface GameStateInterface {
    typingPrompt: string;
    yourTyping: string;
    opponentTyping: string;
    yourAPM: number;
    opponentAPM: number;
    timeStarted: number;
    sliceNumber: number;
    incorrect: boolean;
    gameWon: boolean;
}

export const intitalState: GameStateInterface = {
    typingPrompt: "Peter Piper picked a peck of pickled peppers.",
    yourTyping: "",
    opponentTyping: "",
    yourAPM: 0,
    opponentAPM: 0,
    timeStarted: 0,
    sliceNumber: 0,
    incorrect: false,
    gameWon: false,
};

export const gameReducer = (state = intitalState, action: GameActionTypes): GameStateInterface => {
    switch (action.type) {
        case TYPE_CHARACTER:
            return {
                ...state,
                yourTyping: action.payload.yourTyping,
                incorrect: action.payload.incorrect,
                sliceNumber: action.payload.sliceNumber,
            };
        default:
            return state;
    }
};
