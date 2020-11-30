interface SocketConstantInterface {
    [key: string]: string;
}

export const socketConstants: SocketConstantInterface = {
    USERS_LIST: "users_list",
    ADD_USER: "add_user",
    DELETE_USER: "delete_user",
    CHALLENGE_USER: "challenge_user",
    USER_CHALLENGED: "user_challenged",
    ACCEPT_CHALLENGE: "accept_challenge",
    SET_ID: "set_id",
    SET_STATUS: "set_status",
    START_GAME: "start_game",
    TYPE_CHARACTER: "type_character",
    GAME_WON: "game_won",
};
