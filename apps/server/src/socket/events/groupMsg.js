const groupMsg = (socket, data) => {
  console.log("Sending group message:", data);
  socket.to(`group:${data.groupId}`).emit("receive_group_message", {
    from: socket.userId,
    text: data.text,
  });
};

export default groupMsg;
