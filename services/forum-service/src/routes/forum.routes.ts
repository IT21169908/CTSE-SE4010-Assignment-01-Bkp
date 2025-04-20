/**
 * @swagger
 * tags:
 *   - name: Forums
 *     description: Forum management endpoints
 */

import { Router } from "express";
import * as forumController from "../controllers/forum.controller";
import { authenticateUser } from "../middleware/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.use(authenticateUser);

/**
 * @swagger
 * /api/forums:
 *   get:
 *     summary: Get all forums
 *     tags: [Forums]
 *     responses:
 *       200:
 *         description: List of forums
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Forum'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", asyncHandler(forumController.getForums));

/**
 * @swagger
 * /api/forums/course/{courseId}:
 *   get:
 *     summary: Get forums by course ID
 *     tags: [Forums]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the course
 *     responses:
 *       200:
 *         description: List of forums for the specified course
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Forum'
 *       404:
 *         description: No forums found for this course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
  "/course/:courseId",
  asyncHandler(forumController.getForumsByCourseId)
);

/**
 * @swagger
 * /api/forums:
 *   post:
 *     summary: Create a new forum
 *     tags: [Forums]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - courseId
 *               - createdBy
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               courseId:
 *                 type: string
 *               createdBy:
 *                 type: string
 *     responses:
 *       201:
 *         description: Forum created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Forum'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", asyncHandler(forumController.createForum));

/**
 * @swagger
 * /api/forums/{id}:
 *   put:
 *     summary: Update a forum by ID
 *     tags: [Forums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the forum to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Forum updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Forum'
 *       404:
 *         description: Forum not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", asyncHandler(forumController.updateForum));

/**
 * @swagger
 * /api/forums/{id}:
 *   delete:
 *     summary: Delete a forum by ID
 *     tags: [Forums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the forum to delete
 *     responses:
 *       200:
 *         description: Forum deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Forum deleted successfully"
 *       404:
 *         description: Forum not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", asyncHandler(forumController.deleteForum));

export default router;
