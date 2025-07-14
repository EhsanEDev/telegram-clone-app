const connectUser = (socket, data) => {
  console.log("User connected:", data);
  socket.join(`user:${data.userId}`);
  socket.join(`group:family`);
  socket.userId = data.userId;
};

export default connectUser;
