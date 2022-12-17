import mongoose, { model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    message: { type: String, required: true },
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    isRead: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

export const Message = model("messages", messageSchema);
