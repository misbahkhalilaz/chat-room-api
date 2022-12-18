import { Socket } from "socket.io";
import { Message } from "../models";
import { MessagePayload } from "../types/message";
import { decodeToken } from "../utils/secret.util";

export const sendMessage = async (socket: Socket, message: MessagePayload) => {
  try {
    const { userName } = decodeToken(socket.handshake.query.token as string);
    await Message.create({
      message: message.message,
      isRead: false,
      fromUserName: userName,
      toUserName: message.toUserName,
    });

    socket.to(`chatroom:${message.toUserName}`).emit("message", userName);
  } catch (e) {
    console.log(e);
  }
};
