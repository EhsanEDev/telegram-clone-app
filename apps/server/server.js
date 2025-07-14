import express from "express";
import http from "node:http";
import { Server } from "socket.io";

import sendGroupMsg from "./src/socket/events/sendGroupMsg.js";
import sendPrivateMsg from "./src/socket/events/sendPrivateMsg.js";
import connectUser from "./src/socket/events/connectUser.js";

// Create an Express application
const app = express();
// Create an HTTP server with the Express app
const server = http.createServer(app);
// Create a Socket.IO server on top of the HTTP server
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("connect_user", (data) => connectUser(socket, data));
  socket.on("send_private_message", (data) => sendPrivateMsg(socket, data));
  socket.on("send_group_message", (data) => sendGroupMsg(socket, data));

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
