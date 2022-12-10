import { CUSTOMERS_NOT_FOUND, SOMETHING_WENT_WRONG } from "../errors";
import prisma from "../../db/connector";
import { NextApiRequest, NextApiResponse } from "next";

export default async function customersController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // TODO: Get all customers from the database
    const customers = await prisma.customer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!customers) {
      throw CUSTOMERS_NOT_FOUND;
    }

    return res.status(200).json({
      message: "Customers fetched successfully",
      customers,
    });
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
}
