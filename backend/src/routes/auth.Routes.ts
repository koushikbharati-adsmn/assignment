import {
  loginController,
  signupController,
} from "../controllers/auth.controller";
import { Router } from "express";

const router = Router();

router.post("/signup", signupController);

router.post("/login", loginController);

export default router;
