export const TYPE_CHARACTER = "TYPE_CHARACTER";

interface TypeCharacterAction {
    type: typeof TYPE_CHARACTER;
    payload: {
        sliceNumber: number;
        incorrect: boolean;
        yourTyping: string;
    };
}

export type GameActionTypes = TypeCharacterAction;
