const connectUser = (socket: import("socket.io").Socket, data: { userId: string }) => {
  console.log("User connected:", data);
  socket.join(`user:${data.userId}`);
  socket.join(`group:family`);
  socket.data.userId = data.userId;
};

export default connectUser;
