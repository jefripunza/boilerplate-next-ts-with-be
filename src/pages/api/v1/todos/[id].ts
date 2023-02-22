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

  const { id } = req.query;
  if (req.method === Method.put) {
    let { text, done } = req.body;
    const isTodoExist = await Database("todos")
      .select("id")
      .where("id", id)
      .first();
    if (!isTodoExist) {
      return res.status(400).json({ message: "todo tidak ada!" });
    }
    await Database("todos").where("id", id).update({
      text,
      done,
    });
    return res.status(200).json({ message: "success updated!" });
  } else if (req.method === Method.delete) {
    const isTodoExist = await Database("todos")
      .select("id")
      .where("id", id)
      .first();
    if (!isTodoExist) {
      return res.status(400).json({ message: "todo tidak ada!" });
    }
    await Database("todos").where("id", id).delete();
    return res.status(200).json({ message: "success deleted!" });
  } else {
    return res.status(400).json({ message: "endpoint not found!" });
  }
}
