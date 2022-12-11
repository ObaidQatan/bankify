import {
  RECEIVER_NOT_FOUND,
  SENDER_NOT_FOUND,
  SOMETHING_WENT_WRONG,
  UNSUFFECIENT_BALANCE,
} from "../../errors";
import prisma from "../../../db/connector";
import { NextApiRequest, NextApiResponse } from "next";
import generateUniqueId from "../../util/generateUniqueId";
import { toString } from "lodash";

export default async function createTransferController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // TODO: Get restaurant by title from the database
  console.log({
    body: req.body,
  });
  try {
    const sender = await prisma.customer.findUnique({
      where: {
        id: req.body?.senderId as string,
      },
      select: {
        balance: true,
      },
    });

    if (!sender) {
      req.statusCode = 400;
      throw SENDER_NOT_FOUND;
    }

    if ((parseFloat(toString(sender?.balance)) || 0) < req.body?.amount) {
      req.statusCode = 401;
      throw UNSUFFECIENT_BALANCE;
    }

    const receiver = await prisma.customer.findUnique({
      where: {
        id: req.body?.receiverId as string,
      },
      select: {
        balance: true,
      },
    });

    if (!receiver) {
      req.statusCode = 400;
      throw RECEIVER_NOT_FOUND;
    }

    const updatedReceiver = await prisma.customer.update({
      where: {
        id: req.body?.receiverId as string,
      },
      data: {
        balance:
          parseFloat(toString(receiver.balance)) +
          parseFloat(toString(req.body?.amount)),
      },
    });

    const updatedSender = await prisma.customer.update({
      where: {
        id: req.body?.senderId as string,
      },
      data: {
        balance:
          parseFloat(toString(receiver.balance)) -
          parseFloat(toString(req.body?.amount)),
      },
    });

    const createdTransfer = await prisma.transfer.create({
      data: {
        transferNumber: generateUniqueId(),
        amount: req.body?.amount,
        from: {
          connect: {
            id: req.body?.senderId as string,
          },
        },
        to: {
          connect: {
            id: req.body?.receiverId as string,
          },
        },
      },
    });

    return res.status(200).json({
      transfer: {
        ...createdTransfer,
      },
      message: "Transfer created successfully",
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
