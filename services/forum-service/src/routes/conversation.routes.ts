import { Router } from "express";
import * as conversationController from "../controllers/conversation.controller";
import { authenticateUser } from "../middleware/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.use(authenticateUser);

router.post(
  "/:forumId",
  asyncHandler(conversationController.createConversation)
);

export default router;
