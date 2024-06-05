import type { NextApiRequest, NextApiResponse } from "next";
import { handler, schema } from "../../serverless/hello";

export default function _handler(
  req: NextApiRequest,
  res: NextApiResponse<ReturnType<typeof handler>>
) {
  const result = schema.safeParse(JSON.parse(req.body));
  if (!result.success) {
    return res.status(400).json(result.error);
  }
  res.status(200).json(handler(result.data));
}
