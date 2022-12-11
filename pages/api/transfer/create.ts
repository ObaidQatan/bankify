import { NextApiRequest, NextApiResponse } from "next";
import createTransferController from "../../../src/controllers/transfer/createTransferController";
import {
  ALL_FIELDS_ARE_REQUIRED,
  SOMETHING_WENT_WRONG,
} from "../../../src/errors";

export default async function customers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // TODO: Check if accessToken is valid
    // authenticate(req, res);
    // TODO: Check if user is super admin
    console.log("create transfer Api");
    if (!req.body.senderId || !req.body.receiverId || !req.body.amount) {
      req.statusCode = 400;
      throw ALL_FIELDS_ARE_REQUIRED;
    }
  } catch (error) {
    if (typeof error === "string") {
      return res.json({ message: SOMETHING_WENT_WRONG, error });
    } else {
      return res.json({
        message: SOMETHING_WENT_WRONG,
        error: (error as { message: string })?.message,
      });
    }
  }

  return await createTransferController(req, res);
}
