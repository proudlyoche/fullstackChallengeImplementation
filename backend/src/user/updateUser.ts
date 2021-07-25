import { Request, Response } from "express";
import { userModel } from "./modal";
import { UserType } from "./types";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userID, email, name, role }: { userID: string } & UserType =
      req.body;
    const user = await userModel.findOne({ _id: userID });
    if (!user) {
      res.boom.notFound("User not found");
      return;
    }
    await userModel
      .updateOne(
        {
          _id: userID,
        },
        {
          email: email ?? user.email,
          name: name ?? user.name,
          role: role ?? user.role,
          lastModified: new Date(),
        }
      )
      .then((user) => {
        res.json({ message: "Users details updated", user });
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
