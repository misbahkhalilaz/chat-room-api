import express from "express";
import { getMessages } from "../controllers/message.controller";
import { user } from "../controllers/user.controller";
import { users } from "../controllers/users.controller";
import { authorizeUser } from "../middlewares/auth.middleware";

export const UserRouter = express.Router().use(authorizeUser);

UserRouter.get("/", user);
UserRouter.get("/all", users);
UserRouter.get("/messages/:userName", getMessages);
