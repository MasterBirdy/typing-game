import { TYPE_CHARACTER, GameActionTypes } from "../constants/gameConstants";

export interface GameStateInterface {
    opponentID: string;
    typingPrompt: string;
    yourTyping: string;
    sliceNumber: number;
    incorrect: boolean;
}

export const intitalState: GameStateInterface = {
    opponentID: "",
    typingPrompt: "Peter Piper picked a peck of pickled peppers.",
    yourTyping: "",
    sliceNumber: 0,
    incorrect: false,
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
