import { Request, Response } from "express";
import Forum from "../models/forum.model";

export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await Forum.find().sort({ createdAt: -1 });
  res.json(posts);
};

export const createPost = async (req: Request, res: Response) => {
  const { title, content, author } = req.body;
  const newPost = new Forum({ title, content, author });
  await newPost.save();
  res.status(201).json(newPost);
};

export const getPostById = async (req: Request, res: Response) => {
  const post = await Forum.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
};

export const deletePost = async (req: Request, res: Response) => {
  await Forum.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted" });
};
