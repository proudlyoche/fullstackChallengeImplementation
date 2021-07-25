import { Request, Response } from "express";
import { userModel } from "./modal";
import { UserType } from "./types";

export const addUser = async (req: Request, res: Response) => {
  try {
    const { email, name, role }: UserType = req.body;
    await new userModel({
      email,
      name,
      role,
    })
      .save()
      .then((user) => {
        res.json({ user });
      })
      .catch((error) => {
        if (error.keyPattern.email) {
          res.boom.conflict("A user with this email already exit.")
          return
        }
        res.boom.internal(JSON.stringify(error));
      });
  } catch (error) {
    res.boom.internal(JSON.stringify(error));
  }
};
