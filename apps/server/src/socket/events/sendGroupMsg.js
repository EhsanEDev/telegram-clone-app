const sendGroupMsg = (socket, data) => {
  console.log(`[GROUP] ${socket.userId} -> group:${data.groupId}: ${data.text}`);
  socket.to(`group:${data.groupId}`).emit("receive_group_message", {
    from: socket.userId,
    text: data.text,
    time: new Date().toISOString(),
  });
};

export default sendGroupMsg;