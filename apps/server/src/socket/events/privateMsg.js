const privateMsg = (socket, data) => {
  console.log("Sending private message:", data);
  socket.to(`user:${data.to}`).emit("receive_private_message", {
    from: socket.userId,
    text: data.text,
  });
};

export default privateMsg;
