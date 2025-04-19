/**
 * @swagger
 * tags:
 *   - name: Conversations
 *     description: Conversation management within forums
 */

import { Router } from "express";
import * as conversationController from "../controllers/conversation.controller";
import { authenticateUser } from "../middleware/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.use(authenticateUser);

/**
 * @swagger
 * /api/conversations/{forumId}:
 *   post:
 *     summary: Create a new conversation in a forum
 *     tags: [Conversations]
 *     parameters:
 *       - in: path
 *         name: forumId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the forum to add conversation to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *               - senderId
 *             properties:
 *               message:
 *                 type: string
 *               senderId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Conversation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conversation'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Forum not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  "/:forumId",
  asyncHandler(conversationController.createConversation)
);

export default router;
