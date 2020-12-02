import {
    TYPE_CHARACTER,
    GameActionTypes,
    SET_TIME,
    UPDATE_TIME_GAME,
    OpponentData,
    UPDATE_OPPONENT_GAME_DATA,
    INCREMENT_ACTION_COUNTER,
    START_THE_GAME,
    WON_THE_GAME,
    STOP_THE_GAME,
} from "../constants/gameConstants";

export const typeCharacter = (input: string, prompt: string): GameActionTypes => {
    const diffPos = findFirstDiffPos(prompt, input);
    const correctString = prompt.slice(0, diffPos);
    return {
        type: TYPE_CHARACTER,
        payload: { sliceNumber: diffPos, incorrect: correctString !== input, yourTyping: input },
    };
};

export const setTime = (time: number): GameActionTypes => {
    return {
        type: SET_TIME,
        payload: time,
    };
};

export const updateTimeGame = (): GameActionTypes => {
    return {
        type: UPDATE_TIME_GAME,
        payload: Date.now(),
    };
};

export const updateOpponentGameData = (data: OpponentData): GameActionTypes => {
    return {
        type: UPDATE_OPPONENT_GAME_DATA,
        payload: data,
    };
};

export const incrementActionCounter = (): GameActionTypes => {
    return {
        type: INCREMENT_ACTION_COUNTER,
    };
};

export const gameStart = (time: number, prompt: string): GameActionTypes => {
    return {
        type: START_THE_GAME,
        payload: {
            time,
            prompt,
        },
    };
};

export const gameWon = (winnerIsYou: boolean): GameActionTypes => {
    return {
        type: WON_THE_GAME,
        payload: winnerIsYou,
    };
};

export const stopGame = (): GameActionTypes => {
    return {
        type: STOP_THE_GAME,
    };
};

function findFirstDiffPos(prompt: string, input: string) {
    let shorterLength = Math.min(prompt.length, input.length);
    for (let i = 0; i < shorterLength; i++) {
        if (prompt[i] !== input[i]) return i;
    }
    return shorterLength;
}
