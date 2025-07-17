const express = require("express");
const http = require("node:http");
const { Server } = require("socket.io");
const connectUser = require("./socket/events/connectUser");
const sendGroupMsg = require("./socket/events/sendGroupMsg");
const sendPrivateMsg = require("./socket/events/sendPrivateMsg");
const { SOCKET_EVENTS } = require("@shared/constants/events");
import type {
  GroupMessagePayload,
  PrivateMessagePayload,
  RegisterUserPayload,
} from "@shared/types/socket";

//Create an Express application
const app = express();
//Create an HTTP server with the Express app
const server = http.createServer(app);
//Create a Socket.IO server on top of the HTTP server
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});

app.get(
  "/",
  (req: import("express").Request, res: import("express").Response) => {
    res.send("Hello World");
  }
);

io.on("connection", (socket: import("socket.io").Socket) => {
  console.log("A user connected");

  socket.on(SOCKET_EVENTS.REGISTER_USER, (data: RegisterUserPayload) =>
    connectUser(socket, data)
  );
  socket.on(SOCKET_EVENTS.SEND_PRIVATE_MESSAGE, (data: PrivateMessagePayload) =>
    sendPrivateMsg(socket, data)
  );
  socket.on(SOCKET_EVENTS.SEND_GROUP_MESSAGE, (data: GroupMessagePayload) =>
    sendGroupMsg(socket, data)
  );

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
