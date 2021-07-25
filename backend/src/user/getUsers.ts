import { Request, Response } from "express";
import { userModel } from "./modal";

export const getUsers = async (req: Request, res: Response) => {
  try {
    await userModel
      .find({})
      .then((users) => {
        res.json({ message: "Users details", users });
      })
      .catch((error) => {
        res.boom.internal(JSON.stringify(error));
      });
  } catch (error) {
    res.boom.internal(JSON.stringify(error));
  }
};
