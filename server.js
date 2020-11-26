import express from "express";
import http from "http";
import { users, socket } from "./socket/socketController";
import cors from "cors";

const app = express();

app.use(cors());

const server = new http.Server(app);

socket(server);

server.listen(5000, () => {
    console.log("Socket listening!");
});
