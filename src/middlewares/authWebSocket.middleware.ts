import { User } from "../models";
import { WSMiddleware } from "../types";
import { decodeToken } from "../utils/secret.util";

export const authWebSocket: WSMiddleware = async (socket, next) => {
  try {
    if (socket.handshake.query && socket.handshake.query.token) {
      const { userName } = decodeToken(socket.handshake.query.token as string);

      const user = await User.findOne({ userName });

      if (user?._id) {
        return next();
      }
    }
    next(new Error("Authentication error"));
  } catch (e) {
    next(new Error("Somethin went wrong."));
  }
};
