import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth";
import {
  register,
  login,
  getMe,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/UserController";

const router = Router();

router.post("/auth/registration", register);

router.post("/auth/login", login);

router.get("/auth/me", checkAuth, getMe);

router.get("/users", getAllUsers);

router.get("/user/:id", getUserById);

router.patch("/user/:token", checkAuth, updateUser);

export default router;
