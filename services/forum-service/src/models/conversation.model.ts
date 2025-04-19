/**
 * @swagger
 * components:
 *   schemas:
 *     Conversation:
 *       type: object
 *       required:
 *         - forumId
 *         - message
 *         - senderId
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         forumId:
 *           type: string
 *           description: ID of the forum this conversation belongs to
 *         message:
 *           type: string
 *           description: Message content
 *         senderId:
 *           type: string
 *           description: ID of the user who sent the message
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Message creation timestamp
 */

import mongoose, { Schema, Document } from "mongoose";

export interface IConversation extends Document {
  forumId: string;
  message: string;
  senderId: string;
  createdAt: Date;
}

const ConversationSchema: Schema = new Schema({
  forumId: { type: String, required: true },
  message: { type: String, required: true },
  senderId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IConversation>(
  "Conversation",
  ConversationSchema
);
