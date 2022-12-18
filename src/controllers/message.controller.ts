import { Message as MessageModel } from "../models";
import { Controller } from "../types";
import { Message } from "../types/message";
import { getErrorResponse, getSuccessResponse } from "../utils/response.util";

export const getMessages: Controller = async (req, res) => {
  try {
    const { userName } = req.params;

    const messages = await MessageModel.find({
      $or: [
        {
          fromUserName: userName,
          toUserName: req.user?.userName,
        },
        {
          fromUserName: req.user?.userName,
          toUserName: userName,
        },
      ],
    });

    res.send(
      getSuccessResponse<{ messages: Message[] }>({
        messages: messages.map((msg) => ({
          message: msg.message,
          fromUserName: msg.fromUserName,
          toUserName: msg.toUserName,
          isRead: msg.isRead,
        })),
      })
    );
  } catch (e) {
    console.log(e);
    res.status(500).send(getErrorResponse());
  }
};
