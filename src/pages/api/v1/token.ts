// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Method, Response } from "../../../contracts/server";

import { createToken } from "../../../utils/jwt";

// ---------------------------------------------------------------------

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === Method.get) {
    const token = createToken({
      id: 1,
    });
    return res.status(200).json({ token });
  } else {
    return res.status(400).json({ message: "endpoint not found!" });
  }
}
