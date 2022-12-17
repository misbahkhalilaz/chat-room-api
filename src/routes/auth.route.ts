import express from "express";
import { login } from "../controllers/login.controller";
import { register } from "../controllers/register.controller";

export const AuthRouter = express.Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
