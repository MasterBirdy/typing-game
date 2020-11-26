interface SocketConstantInterface {
    [key: string]: string;
}

export const socketConstants: SocketConstantInterface = {
    USERS_LIST: "users_list",
    ADD_USER: "add_user",
    DELETE_USER: "delete_user",
    INVITE_USER: "invite_user",
    SET_STATUS: "set_status",
};
