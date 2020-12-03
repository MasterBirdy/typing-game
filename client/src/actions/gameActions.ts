import {
    TYPE_CHARACTER,
    GameActionTypes,
    UPDATE_TIME_GAME,
    OpponentData,
    UPDATE_OPPONENT_GAME_DATA,
    INCREMENT_ACTION_COUNTER,
    START_THE_GAME,
    WON_THE_GAME,
    STOP_THE_GAME,
} from "../constants/gameConstants";

/**
 * Uses your current input and the typing prompt to update the game
 * status and determine whether you have a typo in your typing
 * input.
 *
 * @param input Your current typing input from game
 * @param prompt Current typing prompt from game
 */

export const typeCharacter = (input: string, prompt: string): GameActionTypes => {
    const diffPos = findFirstDiffPos(prompt, input);
    const correctString = prompt.slice(0, diffPos);
    return {
        type: TYPE_CHARACTER,
        payload: { sliceNumber: diffPos, incorrect: correctString !== input, yourTyping: input },
    };
};

/**
 * Updates the current time in the game to let the client calculate
 * estimated WPM.
 */

export const updateTimeGame = (): GameActionTypes => {
    return {
        type: UPDATE_TIME_GAME,
        payload: Date.now(),
    };
};

/**
 * Updates the game state with received data from server.
 * @param data Object with the opponent's typing input and total actions.
 */

export const updateOpponentGameData = (data: OpponentData): GameActionTypes => {
    return {
        type: UPDATE_OPPONENT_GAME_DATA,
        payload: data,
    };
};

/**
 * Increases the total actions that you've taken.
 */

export const incrementActionCounter = (): GameActionTypes => {
    return {
        type: INCREMENT_ACTION_COUNTER,
    };
};

/**
 * Starts the games by updating the time states and the typing prompt
 * from the server.
 * @param time Current time in milliseconds
 * @param prompt Typing prompt from server
 */

export const gameStart = (time: number, prompt: string): GameActionTypes => {
    return {
        type: START_THE_GAME,
        payload: {
            time,
            prompt,
        },
    };
};

/**
 * Tells the game state that there is a winner.
 * @param winnerIsYou True if the game winner is you, false if otherwise
 */
export const gameWon = (winnerIsYou: boolean): GameActionTypes => {
    return {
        type: WON_THE_GAME,
        payload: winnerIsYou,
    };
};

/**
 * Stops the game and takes both users out of game mode.
 */
export const stopGame = (): GameActionTypes => {
    return {
        type: STOP_THE_GAME,
    };
};

/**
 * Finds the first character index in which two strings do not match.
 * @param prompt Typing prompt of game
 * @param input Your typing input
 */
function findFirstDiffPos(prompt: string, input: string) {
    let shorterLength = Math.min(prompt.length, input.length);
    for (let i = 0; i < shorterLength; i++) {
        if (prompt[i] !== input[i]) return i;
    }
    return shorterLength;
}
