import { Server } from "socket.io";
import http from "http";
import { MessagePayload } from "./types/message";
import { authWebSocket } from "./middlewares/authWebSocket.middleware";
import { sendMessage } from "./controllers/socket.controller";
import { decodeToken } from "./utils/secret.util";

export const mountWebSocketServer = (
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
) => {
  const io = new Server(server, {
    path: "/chat/",
    transports: ["websocket", "polling"], // polling as fallback
    cors: {
      origin: ["*"],
    },
  });

  io.use(authWebSocket);

  io.on("connection", (socket) => {
    const { userName } = decodeToken(socket.handshake.query.token as string);
    socket.join(`chatroom:${userName}`);

    socket.on("send-message", (message: MessagePayload) =>
      sendMessage(socket, message)
    );

    socket.on("disconnect", () => {});
  });
};
