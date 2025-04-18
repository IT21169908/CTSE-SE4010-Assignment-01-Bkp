import { Request, Response } from "express";
import Forum from "../models/forum.model";
import { Role } from "../constants/roles";
import { hasRole } from "../utils/roleChecker";

const staffRoles = [Role.ADMIN, Role.LECTURER];

export const createForum = async (req: Request, res: Response) => {
  if (!hasRole(req, staffRoles)) {
    return res.status(403).json({ message: "Unauthorized to create forum" });
  }

  const { title, content, courseId } = req.body;

  try {
    const newForum = await Forum.create({
      title,
      content,
      courseId,
      createdBy: req.user!._id,
    });

    res.status(201).json(newForum);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

export const updateForum = async (req: Request, res: Response) => {
  if (!hasRole(req, staffRoles)) {
    return res.status(403).json({ message: "Unauthorized to update forum" });
  }

  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedForum = await Forum.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedForum) {
      return res.status(404).json({ message: "Forum not found" });
    }

    res.status(200).json(updatedForum);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

export const deleteForum = async (req: Request, res: Response) => {
  if (!hasRole(req, staffRoles)) {
    return res.status(403).json({ message: "Unauthorized to delete forum" });
  }

  const { id } = req.params;

  try {
    const deletedForum = await Forum.findByIdAndDelete(id);
    if (!deletedForum) {
      return res.status(404).json({ message: "Forum not found" });
    }

    res.status(200).json({ message: "Forum deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};
