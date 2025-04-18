import { Router } from "express";
import {
  createForum,
  getForums,
  getForumsByCourseId,
  updateForum,
  deleteForum,
} from "../controllers/forum.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", getForums);
router.get("/course/:courseId", getForumsByCourseId);
router.post("/", createForum);
router.put("/:id", updateForum);
router.delete("/:id", deleteForum);

export default router;
