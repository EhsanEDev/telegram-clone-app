import express from "express";
import http from "node:http";
import { Server } from "socket.io";

import groupMsg from "./src/socket/events/groupMsg.js";
import privateMsg from "./src/socket/events/privateMsg.js";
import registerUser from "./src/socket/events/register.js";

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

  socket.on("register", (data) => registerUser(socket, data));
  socket.on("send_private_message", (data) => privateMsg(socket, data));
  socket.on("send_group_message", (data) => groupMsg(socket, data));

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
