import socketio from "socket.io";
import Room from "../socket/Room";
import { v4 as uuidv4 } from "uuid";
export const users = {};
export const rooms = {};

let count = 0;

const socketConstants = {
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

const statusConstants = {
    IDLE: "Idle",
    WAITING: "Waiting",
    PLAYING: "Playing",
};

export const socket = (app) => {
    const io = socketio(app, {
        cors: {
            origin: "*",
        },
    });

    const {
        USERS_LIST,
        ADD_USER,
        DELETE_USER,
        INVITE_USER,
        USER_INVITED,
        ACCEPT_INVITE,
        SET_STATUS,
        START_GAME,
        TYPE_CHARACTER,
        GAME_WON,
    } = socketConstants;
    const { IDLE, WAITING, PLAYING } = statusConstants;

    io.on("connection", (socket) => {
        users[socket.id] = socket;
        socket.handshake.status = IDLE;
        socket.handshake.name = `User ${++count}`;
        io.to(socket.id).emit(
            USERS_LIST,
            Object.keys(users).filter((user) => user !== socket.id)
        );
        socket.broadcast.emit(ADD_USER, socket.id);

        socket.on(INVITE_USER, (invite) => {
            socket.handshake.status = WAITING;
            if (users[invite]) {
                users[invite].handshake.status = WAITING;
                io.to(invite).emit(USER_INVITED, socket.id);
            }
        });

        socket.on(ACCEPT_INVITE, (invite) => {
            const roomID = uuidv4();
            const opponentSocket = users[invite];
            if (opponentSocket && opponentSocket.handshake.status === WAITING) {
                opponentSocket.handshake.room = roomID;
                socket.handshake.room = roomID;
                rooms[roomID] = new Room([socket.id, opponentSocket.id]);
                socket.handshake.status = PLAYING;
                io.to(socket.id).emit(START_GAME);
                opponentSocket.handshake.status = PLAYING;
                io.to(opponentSocket.id).emit(START_GAME);
            }
        });

        socket.on(TYPE_CHARACTER, (currentString) => {
            const roomID = socket.handshake.room;
            if (socket.handshake.status === PLAYING && roomID && rooms[roomID]) {
                const room = rooms[roomID];
                room.addCharacter(currentString, socket.id);
                console.log(currentString);
                if (room.hasUserWon(socket.id)) {
                    Object.keys(room.members).forEach((member) => {
                        io.to(member).emit(GAME_WON);
                    });
                }
            }
        });

        socket.on("disconnect", function () {
            delete users[socket.id];
            io.emit(DELETE_USER, socket.id);
        });
    });

    return io;
};
