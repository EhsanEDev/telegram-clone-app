const sendPrivateMsg = (socket: import("socket.io").Socket, data: { to: string; text: string }) => {
  console.log("Sending private message:", data);
  socket.to(`user:${data.to}`).emit("receive_private_message", {
    from: socket.data.userId,
    text: data.text,
    time: new Date().toISOString(),
  });
};

export default sendPrivateMsg;
