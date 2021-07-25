import { Request, Response } from "express";
import { userModel } from "./modal";

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.query as unknown as { userID: string };
    await userModel
      .deleteOne({ _id: userID })
      .then(() => {
        res.json({ message: "delete successful" });
      })
      .catch((error) => {
        res.boom.internal(JSON.stringify(error));
      });
  } catch (error) {
    res.boom.internal(JSON.stringify(error));
  }
};
