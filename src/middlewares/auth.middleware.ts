import { User } from "../models";
import { Middleware } from "../types";
import { getErrorResponse } from "../utils/response.util";
import { decodeToken } from "../utils/secret.util";

export const authorizeUser: Middleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (token) {
      const { userName } = decodeToken(token);

      const user = await User.findOne({ userName });

      if (user?._id) {
        req.user = {
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          isOnline: user.isOnline,
        };
        return next();
      }
    }

    res.status(400).json(getErrorResponse("Unauthorized", 400));
  } catch (e) {
    console.log(e);
    res.status(500).send(getErrorResponse());
  }
};
