const sendGroupMsg = (
  socket: import("socket.io").Socket,
  data: { text: string; group: string }
) => {
  console.log(`[GROUP] ${socket.data.userId} -> group:family: ${data.text}`);
  socket.to(`group:family`).emit("receive_group_message", {
    from: socket.data.userId,
    group: data.group,
    text: data.text,
    time: new Date().toISOString(),
  });
};

export default sendGroupMsg;
