import { Controller } from "../types";
import { getErrorResponse, getSuccessResponse } from "../utils/response.util";
import { User } from "../models";

export const users: Controller = async (req, res) => {
  try {
    const users = await User.find({
      userName: { $ne: req.user?.userName },
    }).select({
      _id: 0,
      password: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    res.status(200).send(
      getSuccessResponse({
        users: users.map((user) => ({
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          isOnline: user.isOnline,
        })),
      })
    );
  } catch (e) {
    console.log(e);
    res.status(500).send(getErrorResponse());
  }
};
