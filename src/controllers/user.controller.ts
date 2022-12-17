import { Controller } from "../types";
import { getErrorResponse, getSuccessResponse } from "../utils/response.util";
import { RegisterUser, UserData } from "../types/user";

export const user: Controller<RegisterUser> = async (req, res) => {
  try {
    if (req.user) {
      return res.send(
        getSuccessResponse<UserData>({
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          userName: req.user.userName,
          isOnline: req.user.isOnline,
        })
      );
    }

    res.status(400).send(getErrorResponse("Invalid session.", 400));
  } catch (e) {
    console.log(e);
    res.status(500).send(getErrorResponse());
  }
};
