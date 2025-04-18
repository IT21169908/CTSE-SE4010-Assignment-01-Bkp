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
