import { NextApiRequest, NextApiResponse } from "next";
import customersController from "../../../src/controllers/customersController";
import { SOMETHING_WENT_WRONG } from "../../../src/errors";

export default async function customers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // TODO: Check if accessToken is valid
    // authenticate(req, res);
    // TODO: Check if user is super admin
    console.log("customers Api");
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

  return await customersController(req, res);
}
