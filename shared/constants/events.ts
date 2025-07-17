const SOCKET_EVENTS = {
  REGISTER_USER: "register_user",
  SEND_PRIVATE_MESSAGE: "send_private_message",
  RECEIVE_PRIVATE_MESSAGE: "receive_private_message",
  SEND_GROUP_MESSAGE: "send_group_message",
  RECEIVE_GROUP_MESSAGE: "receive_group_message",
} as const;

module.exports = { SOCKET_EVENTS };
