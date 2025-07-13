const registerUser = (socket, data) => {
  console.log("User registered:", data);
  socket.join(`user:${data.userId}`);
  socket.userId = data.userId;
};

// module.exports = registerUser;
export default registerUser;
