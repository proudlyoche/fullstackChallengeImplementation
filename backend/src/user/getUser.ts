import { Request, Response } from "express";
import { userModel } from "./modal";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.query as unknown as { userID: string };
    await userModel
      .findOne({ _id: userID })
      .then((user) => {
        res.json({ message: "User details", user });
      })
      .catch((error) => {
        res.boom.internal(JSON.stringify(error));
      });
  } catch (error) {
    res.boom.internal(JSON.stringify(error));
  }
};
