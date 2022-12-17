import { User } from "../models";
import { Controller } from "../types";
import { compareHash, hashSecret, signToken } from "../utils/secret.util";
import { getErrorResponse, getSuccessResponse } from "../utils/response.util";
import { AuthResponse, LoginCredentials } from "../types/user";

export const login: Controller<LoginCredentials> = async (req, res) => {
  try {
    const { userName, password: reqPassword } = req.body;

    const isPayloadValid = () => userName?.trim() && reqPassword?.trim();

    if (isPayloadValid()) {
      const dbUser = await User.findOne({ userName });

      if (dbUser?._id) {
        if (compareHash(reqPassword, dbUser?.password)) {
          const { password, ...user } = dbUser;
          const token = signToken({ payload: user.userName });

          return res.send(
            getSuccessResponse<AuthResponse>({
              token,
              user,
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
