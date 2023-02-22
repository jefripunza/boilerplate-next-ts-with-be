import jwt from "jsonwebtoken";

import { loadEnvConfig } from "@next/env";
const dev = process.env.NODE_ENV !== "production";
const { JWT_SECRET, JWT_EXPIRED }: any = loadEnvConfig("./", dev).combinedEnv;

interface IOption {
  expiresIn?: string;
}

export const createToken = (object: object, expiresIn = false) => {
  const options: IOption = {};
  if (!expiresIn) {
    options.expiresIn = JWT_EXPIRED ?? "5d";
  }
  return jwt.sign(object, JWT_SECRET, options);
};
