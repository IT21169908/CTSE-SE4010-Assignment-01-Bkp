import express from "express";
import {
  getAllPosts,
  createPost,
  getPostById,
  deletePost,
} from "../controllers/forum.controller";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", createPost);
//router.get('/:id', getPostById);
router.delete("/:id", deletePost);

export default router;
