import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types";

export const hashRounds = 10;

export const hashSecret = (secret: string, rounds = hashRounds) => {
  return bcrypt.hashSync(secret, rounds);
};

export const compareHash = (plainText: string, hash: string) =>
  bcrypt.compareSync(plainText, hash);

export const signToken = (secret: JwtPayload) =>
  jwt.sign(secret, process.env.JWT_SECRET as string, {
    expiresIn: 7 * 24 * 60 * 60,
  });

export const decodeToken = (token: string): JwtPayload =>
  jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
