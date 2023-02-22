// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Method, Response } from "../../../../contracts/server";

import { Knex } from "knex";
import { getKnex } from "../../../../../knex";

import token_validation from "@/middlewares/token_validation";

// ---------------------------------------------------------------------

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { error, message, user } = await token_validation(req);
  if (error) {
    return res.status(400).json({ message });
  }

  const Database: Knex = getKnex();

  if (req.method === Method.get) {
    const data = await Database("todos");
    return res.status(200).json({ data });
  } else if (req.method === Method.post) {
    let { text, done } = req.body;
    if (!text) {
      return res.status(400).json({ message: "body is'n complete!" });
    }
    done = done === undefined ? false : done;
    const isTodoExist = await Database("todos")
      .select("id")
      .where("text", text)
      .first();
    if (isTodoExist) {
      return res.status(400).json({ message: "todo sudah ada!" });
    }
    await Database("todos").insert({
      text,
      done,
    });
    return res.status(200).json({ message: "success inserted!" });
  } else {
    return res.status(400).json({ message: "endpoint not found!" });
  }
}
