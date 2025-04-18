import express from "express";
import { authenticateUser } from "../middleware/auth.middleware";
import {
  createForum,
  updateForum,
  deleteForum,
} from "../controllers/forum.controller";

const router = express.Router();

router.post("/", authenticateUser, createForum);
router.put("/:id", authenticateUser, updateForum);
router.delete("/:id", authenticateUser, deleteForum);

export default router;
