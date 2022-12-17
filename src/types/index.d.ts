import { NextFunction, Request, Response } from "express";

declare type AnyObject = Record<string, unknown>;

declare type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

declare interface RequestWithBody<T> extends Request {
    body: T
}

declare type Controller<T = AnyObject> = (
  req: RequestWithBody<T>,
  res: Response,
) => void;
