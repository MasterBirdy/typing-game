import { TYPE_CHARACTER, GameActionTypes } from "../constants/gameConstants";

export const typeCharacter = (input: string, prompt: string): GameActionTypes => {
    const diffPos = findFirstDiffPos(prompt, input);
    const correctString = prompt.slice(0, diffPos);
    return {
        type: TYPE_CHARACTER,
        payload: { sliceNumber: diffPos, incorrect: correctString !== input, yourTyping: input },
    };
};

function findFirstDiffPos(prompt: string, input: string) {
    let shorterLength = Math.min(prompt.length, input.length);
    for (let i = 0; i < shorterLength; i++) {
        if (prompt[i] !== input[i]) return i;
    }
    return shorterLength;
}
