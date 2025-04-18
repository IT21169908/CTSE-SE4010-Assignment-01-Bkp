import { Router } from "express";
import * as forumController from "../controllers/forum.controller";
import { authenticateUser } from "../middleware/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.use(authenticateUser);

router.get("/", asyncHandler(forumController.getForums));

router.get(
  "/course/:courseId",
  asyncHandler(forumController.getForumsByCourseId)
);

router.post("/", asyncHandler(forumController.createForum));

router.put("/:id", asyncHandler(forumController.updateForum));

router.delete("/:id", asyncHandler(forumController.deleteForum));

export default router;
