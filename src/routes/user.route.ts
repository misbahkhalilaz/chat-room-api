import express from "express";
import { user } from "../controllers/user.controller";
import { authorizeUser } from "../middlewares/auth.middleware";

export const UserRouter = express.Router().use(authorizeUser);

UserRouter.post("/", user);
