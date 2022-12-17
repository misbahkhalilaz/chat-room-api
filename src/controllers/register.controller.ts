import { User } from "../models";
import { Controller } from "../types";
import { hashSecret, signToken } from "../utils/secret.util";
import { getErrorResponse, getSuccessResponse } from "../utils/response.util";
import { AuthResponse, RegisterUser } from "../types/user";

export const register: Controller<RegisterUser> = async (req, res) => {
  try {
    const { firstName, lastName, userName, password } = req.body;

    const isPayloadValid = () =>
      firstName?.trim() &&
      lastName?.trim() &&
      userName?.trim() &&
      password?.trim();

    if (isPayloadValid()) {
      const registeredUser = await User.create({
        firstName,
        lastName,
        userName,
        password: hashSecret(password),
      });

      if (registeredUser._id) {
        const token = signToken({ userName: registeredUser.userName });

        return res.send(
          getSuccessResponse<AuthResponse>({
            token,
            user: {
              firstName: registeredUser.firstName,
              lastName: registeredUser.lastName,
              userName: registeredUser.userName,
              isOnline: registeredUser.isOnline,
            },
          })
        );
      }
    }

    res
      .status(400)
      .send(getErrorResponse("User could not be registered.", 400));
  } catch (e) {
    console.log(e);
    res.status(500).send(getErrorResponse());
  }
};
