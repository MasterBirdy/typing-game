import express from "express";
import path from "path";
import http from "http";
require("dotenv").config();
import { socket } from "./socket/socketController";
import cors from "cors";

const app = express();

app.use(cors());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
}

const server = new http.Server(app);

socket(server);

server.listen(5000, () => {
    console.log("Socket listening!");
});
