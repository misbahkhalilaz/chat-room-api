import { User } from "../models";
import { Controller } from "../types";
import { compareHash, signToken } from "../utils/secret.util";
import { getErrorResponse, getSuccessResponse } from "../utils/response.util";
import { AuthResponse, LoginCredentials } from "../types/user";

export const login: Controller<LoginCredentials> = async (req, res) => {
  try {
    const { userName, password: reqPassword } = req.body;

    const isPayloadValid = () => userName?.trim() && reqPassword?.trim();

    if (isPayloadValid()) {
      const user = await User.findOne({ userName });

      if (user?._id) {
        if (compareHash(reqPassword, user?.password)) {
          const token = signToken({ userName: user.userName });

          return res.send(
            getSuccessResponse<AuthResponse>({
              token,
              user: {
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
                isOnline: user.isOnline,
              },
            })
          );
        }
      }
    }

    res
      .status(400)
      .send(getErrorResponse("Invalid username or password.", 400));
  } catch (e) {
    console.log(e);
    res.status(500).send(getErrorResponse());
  }
};
