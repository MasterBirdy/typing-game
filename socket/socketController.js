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
    SET_STATUS: "set_status",
    PLAY_GAME: "play_game",
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

    const { USERS_LIST, ADD_USER, DELETE_USER, INVITE_USER, SET_STATUS, PLAY_GAME } = socketConstants;
    const { IDLE, WAITING, PLAYING } = statusConstants;

    io.on("connection", (socket) => {
        users[socket.id] = socket;
        socket.handshake.status = IDLE;
        socket.handshake.name = `User ${++count}`;
        io.to(socket.id).emit(USERS_LIST, Object.keys(users));
        socket.broadcast.emit(ADD_USER, socket.id);

        socket.on(INVITE_USER, (invite) => {
            io.to(socket.id).emit(SET_STATUS, WAITING);
            setTimeout(() => {
                io.emit(SET_STATUS, IDLE);
            }, 1500);
        });

        socket.on(PLAY_GAME, (invite) => {
            const roomID = uuidv4();
            const opponentSocket = users[invite];
            if (opponentSocket && opponentSocket.handshake.status !== IDLE) {
                opponentSocket.handshake.room = roomID;
                socket.handshake.room = roomID;
                rooms[roomID] = new Room([socket.id, opponentSocket.id]);
            }
        });

        socket.on("disconnect", function () {
            delete users[socket.id];
            io.emit(DELETE_USER, socket.id);
        });
    });

    return io;
};
