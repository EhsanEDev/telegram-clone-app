const sendGroupMsg = (socket, data) => {
  console.log(`[GROUP] ${socket.userId} -> group:family: ${data.text}`);
  socket.to(`group:family`).emit("receive_group_message", {
    from: socket.userId,
    group: data.group,
    text: data.text,
    time: new Date().toISOString(),
  });
};

export default sendGroupMsg;
