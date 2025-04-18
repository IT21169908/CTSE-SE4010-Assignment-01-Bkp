import express from "express";
import { createConversation } from "../controllers/conversation.controller";
import { authenticateUser } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", authenticateUser, createConversation);

export default router;
