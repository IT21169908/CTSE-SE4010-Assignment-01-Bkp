import mongoose, { Schema, Document } from "mongoose";

export interface IForum extends Document {
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

const ForumSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IForum>("Forum", ForumSchema);
