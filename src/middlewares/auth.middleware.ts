import { Middleware } from "../types";
import { getErrorResponse } from "../utils/response.util";

export const authorizeUser: Middleware = (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (token) {
    if ("validate token here") {
      return next();
    }
  }

  res.status(400).json(getErrorResponse("Unauthorized", 400));
};
