interface SocketConstantInterface {
    [key: string]: string;
}

export const socketConstants: SocketConstantInterface = {
    USERS_LIST: "users_list",
    ADD_USER: "add_user",
    DELETE_USER: "delete_user",
    INVITE_USER: "invite_user",
    USER_INVITED: "user_invited",
    ACCEPT_INVITE: "accept_invite",
    SET_STATUS: "set_status",
    START_GAME: "start_game",
    TYPE_CHARACTER: "type_character",
    GAME_WON: "game_won",
};
