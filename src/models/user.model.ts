import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    isOnline: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

export const User = model("users", userSchema);
