import { Router } from "express";
import { addUser } from "./addUser";
import { deleteUser } from "./deleteUser";
import { getUser } from "./getUser";
import { getUsers } from "./getUsers";
import { updateUser } from "./updateUser";

export const userRouter = Router();

userRouter.post("/users", addUser);
userRouter.put("/users", updateUser);
userRouter.get("/user", getUser);
userRouter.get("/users", getUsers);
userRouter.delete("/user", deleteUser);
