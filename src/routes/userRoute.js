import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getOneUser,
  updateUser,
} from "../controllers/userController";

const userRouter = Router();

userRouter.get("/all", getAllUsers);
userRouter.get("/:userId", getOneUser);
userRouter.post("/create", createUser);
userRouter.patch("/update/:userId", updateUser);
userRouter.delete("/:userId", deleteUser);

export default userRouter;
