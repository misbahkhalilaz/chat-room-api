import { NextFunction, Request, Response } from "express";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { UserData } from "./user";

declare type AnyObject = Record<string, unknown>;

declare type Middleware<T = AnyObject> = (
  req: AppRequest<T>,
  res: Response,
  next: NextFunction
) => void;

declare type WSMiddleware = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  next: (err?: ExtendedError | undefined) => void
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
