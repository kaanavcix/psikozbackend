import { createServer } from 'http';
import {App} from "uWebSockets.js"
import { Server } from "socket.io"
import * as dotenv from 'dotenv';
const server = createServer();

const app= App();
const io =  new Server(server);
dotenv.config();

io.attachApp(app);

io.on("connection", (socket: any) => {
    console.log("connection");
})


