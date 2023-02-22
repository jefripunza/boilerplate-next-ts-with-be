import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import { loadEnvConfig } from "@next/env";
const dev = process.env.NODE_ENV !== "production";
const { JWT_SECRET }: any = loadEnvConfig("./", dev).combinedEnv;

interface ITokenValidation {
  user?: object;
  error?: boolean;
  message?: string;
}
const token_validation = async (
  req: NextApiRequest
): Promise<ITokenValidation> => {
  let token = req.headers.authorization;
  if (String(token).startsWith("Bearer ")) {
    const result: any = await new Promise((resolve) => {
      token = String(token).split(" ")[1];
      jwt.verify(token, JWT_SECRET, async (err: any, token_decoded: any) => {
        if (err) {
          resolve({
            error: true,
            message: "Not Authorized!",
          });
        } else {
          resolve({
            user: token_decoded,
          });
        }
      });
    });
    return result;
  } else {
    return {
      error: true,
      message: "Authorization Bearer is required!",
    };
  }
};

export default token_validation;
