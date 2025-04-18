import { Request, Response } from "express";
import Forum from "../models/forum.model";

export const createForum = async (req: Request, res: Response) => {
  const { title, content, courseId } = req.body;
  const user = req.user;

  if (user.role !== 1 && user.role !== 2) {
    return res
      .status(403)
      .json({ message: "Only Admins and Lecturers can create forums" });
  }

  const forum = new Forum({
    title,
    content,
    courseId,
    author: user._id,
  });

  await forum.save();
  res.status(201).json(forum);
};

export const updateForum = async (req: Request, res: Response) => {
  const forum = await Forum.findById(req.params.id);
  const user = req.user;

  if (!forum) return res.status(404).json({ message: "Forum not found" });

  if (forum.author !== user._id) {
    return res
      .status(403)
      .json({ message: "Only the creator can update this forum" });
  }

  forum.title = req.body.title;
  forum.content = req.body.content;
  await forum.save();

  res.json(forum);
};

export const deleteForum = async (req: Request, res: Response) => {
  const forum = await Forum.findById(req.params.id);
  const user = req.user;

  if (!forum) return res.status(404).json({ message: "Forum not found" });

  if (forum.author !== user._id) {
    return res
      .status(403)
      .json({ message: "Only the creator can delete this forum" });
  }

  await forum.deleteOne();
  res.json({ message: "Forum deleted" });
};
