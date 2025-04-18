import { Request, Response } from "express";
import Conversation from "../models/conversation.model";
import Forum from "../models/forum.model";

export const createConversation = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { forumId } = req.params;
  const { message } = req.body;

  try {
    const newMessage = await Conversation.create({
      forumId,
      senderId: user._id,
      message,
    });

    // Push the conversation ID to the forum's conversation list
    await Forum.findByIdAndUpdate(forumId, {
      $push: { conversations: newMessage._id },
    });

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

export const getForumConversations = async (req: Request, res: Response) => {
  const { forumId } = req.params;

  try {
    const messages = await Conversation.find({ forumId }).populate(
      "senderId",
      "name email"
    );
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};
