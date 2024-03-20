import { Router } from "express";
import {
  register,
  login,
  deleteUser,
  getAllUsers,
  getOneUser,
  updateUser,
} from "../controllers/userController";
import { auth } from "../middlewares/auth";

const userRouter = Router();

userRouter.get("/all", auth, getAllUsers);
userRouter.get("/:userId", auth, getOneUser);
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.patch("/update/:userId", auth, updateUser);
userRouter.delete("/:userId", auth, deleteUser);

export default userRouter;
