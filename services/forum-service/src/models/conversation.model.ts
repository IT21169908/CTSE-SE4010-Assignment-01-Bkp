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
