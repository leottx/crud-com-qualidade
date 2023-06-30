import { NextApiRequest, NextApiResponse } from "next";
import { todosController } from "@server/controller/todo";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.method);

  if (req.method === "GET") {
    todosController.get(req, res);
    return;
  }

  res.status(405).json({
    message: "Method not allowed",
  });
}
