import { Router } from "express";
import {
  createWorkflowController,
  deleteWorkflowController,
  getWorkflowsController,
  pinWorkflowController,
} from "@/controllers/workflow.controller";
import { verifyAuthToken } from "@/middlewares/authenticateToken";

const router = Router();

router.get("/", verifyAuthToken, getWorkflowsController);
router.post("/", verifyAuthToken, createWorkflowController);
router.delete("/:id", verifyAuthToken, deleteWorkflowController);
router.patch("/:id/pin", verifyAuthToken, pinWorkflowController);

export default router;
