/**
 * @swagger
 * components:
 *   schemas:
 *     Forum:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - courseId
 *         - createdBy
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         title:
 *           type: string
 *           description: Title of the forum
 *         content:
 *           type: string
 *           description: Content of the forum
 *         courseId:
 *           type: string
 *           description: ID of the course this forum belongs to
 *         createdBy:
 *           type: string
 *           description: ID of the user who created the forum
 *         conversations:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of conversation IDs associated with this forum
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Forum creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Forum last update timestamp
 */

import mongoose, { Schema, Document, Types } from "mongoose";
import Conversation from "./conversation.model";

export interface IForum extends Document {
  title: string;
  content: string;
  courseId: string;
  createdBy: Types.ObjectId;
  conversations: Types.ObjectId[];
}

const forumSchema = new Schema<IForum>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    courseId: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    conversations: [{ type: Schema.Types.ObjectId, ref: "Conversation" }],
  },
  { timestamps: true }
);

// Middleware to auto-delete associated conversations
forumSchema.pre("findOneAndDelete", async function (next) {
  const forum = await this.model.findOne(this.getFilter());

  if (forum) {
    await Conversation.deleteMany({ _id: { $in: forum.conversations } });
  }

  next();
});

export default mongoose.model<IForum>("Forum", forumSchema);
