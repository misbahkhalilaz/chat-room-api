import mongoose, { model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    message: { type: String, required: true },
    fromUserName: {
      type: String,
      required: true,
    },
    toUserName: {
      type: String,
      required: true,
    },
    isRead: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

export const Message = model("messages", messageSchema);
