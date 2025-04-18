import { Request, Response } from "express";
import Conversation from "../models/conversation.model";

export const createConversation = async (req: Request, res: Response) => {
  const { forumId, message } = req.body;
  const user = req.user;

  const conversation = new Conversation({
    forumId,
    message,
    senderId: user._id,
  });

  await conversation.save();
  res.status(201).json(conversation);
};
