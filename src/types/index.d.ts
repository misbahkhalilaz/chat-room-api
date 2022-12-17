import { NextFunction, Request, Response } from "express";
import { UserData } from "./user";

declare type AnyObject = Record<string, unknown>;

declare type Middleware<T = AnyObject> = (
  req: AppRequest<T>,
  res: Response,
  next: NextFunction
) => void;

declare interface AppRequest<T = AnyObject> extends Request {
  body: T;
  user?: UserData;
}

declare type Controller<T = AnyObject> = (
  req: AppRequest<T>,
  res: Response
) => void;

declare interface JwtPayload {
  userName: string;
}
