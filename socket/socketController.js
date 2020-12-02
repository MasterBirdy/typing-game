import socketio from "socket.io";
import socketConstants from "./socketConstants";
import statusConstants from "./statusConstants";
import typingPrompts from "./typingPrompts";
import Room from "../socket/Room";
import { v4 as uuidv4 } from "uuid";
export const users = {};
export const rooms = {};

let count = 0;

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
        CHALLENGE_USER,
        USER_CHALLENGED,
        ACCEPT_CHALLENGE,
        CANCEL_CHALLENGE,
        SET_STATUS,
        UPDATE_GAME,
        CHANGE_NAME,
        SET_ID,
        SET_NAME,
        START_GAME,
        TYPE_CHARACTER,
        GAME_UPDATED,
        GAME_WON,
        OPPONENT_DISCONNECTED,
        OPPONENT_LEFT,
    } = socketConstants;
    const { IDLE, WAITING, CHALLENGED, PLAYING } = statusConstants;

    io.on("connection", (socket) => {
        users[socket.id] = socket;
        io.to(socket.id).emit(SET_ID, socket.id);
        socket.handshake.status = IDLE;
        socket.handshake.name = `User ${++count}`;
        io.to(socket.id).emit(SET_NAME, socket.handshake.name);
        io.to(socket.id).emit(
            USERS_LIST,
            Object.keys(users).reduce((acc, cur) => {
                acc[cur] = { id: cur, name: users[cur].handshake.name, status: users[cur].handshake.status };
                return acc;
            }, {})
        );
        socket.broadcast.emit(ADD_USER, {
            id: socket.id,
            name: socket.handshake.name,
            status: socket.handshake.status,
        });

        socket.on(CHALLENGE_USER, (invite) => {
            const opponent = users[invite];
            if (opponent) {
                socket.handshake.status = WAITING;
                socket.handshake.opponent = opponent.id;
                opponent.handshake.status = CHALLENGED;
                opponent.handshake.opponent = socket.id;
                io.emit(
                    USERS_LIST,
                    Object.keys(users).reduce((acc, cur) => {
                        acc[cur] = { id: cur, name: users[cur].handshake.name, status: users[cur].handshake.status };
                        return acc;
                    }, {})
                );
                io.to(invite).emit(USER_CHALLENGED, {
                    id: socket.id,
                    name: socket.handshake.name,
                    status: socket.handshake.status,
                });
            }
        });

        socket.on(CHANGE_NAME, (name) => {
            socket.handshake.name = name;
            io.emit(
                USERS_LIST,
                Object.keys(users).reduce((acc, cur) => {
                    acc[cur] = { id: cur, name: users[cur].handshake.name, status: users[cur].handshake.status };
                    return acc;
                }, {})
            );
        });

        socket.on(ACCEPT_CHALLENGE, (invite) => {
            const roomID = uuidv4();
            const opponentSocket = users[invite];
            if (opponentSocket && opponentSocket.handshake.status === WAITING) {
                opponentSocket.handshake.room = roomID;
                socket.handshake.room = roomID;
                rooms[roomID] = new Room([socket.id, opponentSocket.id]);
                const time = Date.now();
                socket.handshake.status = PLAYING;
                io.to(socket.id).emit(START_GAME, time, rooms[roomID].typePrompt);
                opponentSocket.handshake.status = PLAYING;
                io.to(opponentSocket.id).emit(START_GAME, time, rooms[roomID].typePrompt);
            }
        });

        socket.on(CANCEL_CHALLENGE, () => {
            opponentLeaves("Your opponent has cancelled the challenge.");
            io.emit(
                USERS_LIST,
                Object.keys(users).reduce((acc, cur) => {
                    acc[cur] = { id: cur, name: users[cur].handshake.name, status: users[cur].handshake.status };
                    return acc;
                }, {})
            );
        });

        socket.on(TYPE_CHARACTER, (currentString, actions) => {
            const roomID = socket.handshake.room;
            if (socket.handshake.status === PLAYING && roomID && rooms[roomID]) {
                const room = rooms[roomID];
                room.addCharacter(currentString, socket.id);
                room.changeActions(actions, socket.id);
                if (room.hasUserWon(socket.id)) {
                    Object.keys(room.members).forEach((member) => {
                        io.to(member).emit(GAME_WON, socket.id);
                    });
                }
            }
        });

        socket.on(UPDATE_GAME, (opponent) => {
            const roomID = socket.handshake.room;
            if (rooms[roomID] && rooms[roomID].members[opponent]) {
                io.to(socket.id).emit(GAME_UPDATED, {
                    opponentTyping: rooms[roomID].members[opponent].currentString,
                    opponentActions: rooms[roomID].members[opponent].actions,
                });
            }
        });

        socket.on(OPPONENT_LEFT, () => {
            opponentLeaves("Your opponent has left the room.");
            io.emit(
                USERS_LIST,
                Object.keys(users).reduce((acc, cur) => {
                    acc[cur] = { id: cur, name: users[cur].handshake.name, status: users[cur].handshake.status };
                    return acc;
                }, {})
            );
        });

        socket.on("disconnect", function () {
            opponentLeaves("Your opponent has disconnected.");
            if (socket.handshake.room && rooms[socket.handshake.room]) {
                Object.keys(rooms[socket.handshake.room].members).forEach((member) => {
                    if (member !== socket.id) {
                        users[member].handshake.room = null;
                    }
                });
                delete rooms[socket.handshake.room];
            }
            delete users[socket.id];
            socket.broadcast.emit(
                USERS_LIST,
                Object.keys(users).reduce((acc, cur) => {
                    acc[cur] = { id: cur, name: users[cur].handshake.name, status: users[cur].handshake.status };
                    return acc;
                }, {})
            );
        });

        function opponentLeaves(message) {
            if (socket.handshake.opponent && users[socket.handshake.opponent]) {
                const opponent = socket.handshake.opponent;
                users[opponent].handshake.status = IDLE;
                users[opponent].handshake.opponent = null;
                io.to(opponent).emit(OPPONENT_DISCONNECTED, message);
            }
            socket.handshake.status = IDLE;
            socket.handshake.opponent = null;
        }
    });

    return io;
};
