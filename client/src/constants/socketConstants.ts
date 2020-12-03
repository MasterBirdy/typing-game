interface SocketConstantInterface {
    [key: string]: string;
}

export const socketConstants: SocketConstantInterface = {
    USERS_LIST: "users_list",
    ADD_USER: "add_user",
    CHALLENGE_USER: "challenge_user",
    USER_CHALLENGED: "user_challenged",
    ACCEPT_CHALLENGE: "accept_challenge",
    CANCEL_CHALLENGE: "cancel_challenge",
    SET_ID: "set_id",
    SET_NAME: "set_name",
    CHANGE_NAME: "change_name",
    SET_STATUS: "set_status",
    START_GAME: "start_game",
    TYPE_CHARACTER: "type_character",
    UPDATE_GAME: "update_game",
    GAME_UPDATED: "game_updated",
    GAME_WON: "game_won",
    OPPONENT_LEFT: "opponent_left",
    OPPONENT_DISCONNECTED: "opponent_disconnected",
};
