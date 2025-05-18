/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *       example:
 *         message: "An error occurred"
 *     Course:
 *       type: object
 *       required:
 *         - name
 *         - code
 *         - description
 *         - credits
 *         - fee
 *         - lecture_id
 *         - status
 *       properties:
 *         _id:
 *           type: string
 *           description: The course ID
 *           example: "60d21b4667d0d8992e610c85"
 *         name:
 *           type: string
 *           description: The course name
 *           example: "Introduction to Computer Science"
 *         code:
 *           type: string
 *           description: The course code
 *           example: "CS101"
 *         description:
 *           type: string
 *           description: The course description
 *           example: "An introductory course to computer science principles"
 *         credits:
 *           type: number
 *           description: The number of credits for the course
 *           example: 3
 *         fee:
 *           type: number
 *           description: The course fee
 *           example: 1000
 *         lecture_id:
 *           type: string
 *           description: The ID of the lecturer teaching the course
 *           example: "60d21b4667d0d8992e610c86"
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           description: The status of the course
 *           example: "active"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the course was created
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the course was last updated
 *           example: "2023-01-02T00:00:00.000Z"
 *     CourseInput:
 *       type: object
 *       required:
 *         - name
 *         - code
 *         - description
 *         - credits
 *         - fee
 *       properties:
 *         name:
 *           type: string
 *           description: The course name
 *           example: "Introduction to Computer Science"
 *         code:
 *           type: string
 *           description: The course code
 *           example: "CS101"
 *         description:
 *           type: string
 *           description: The course description
 *           example: "An introductory course to computer science principles"
 *         credits:
 *           type: number
 *           description: The number of credits for the course
 *           example: 3
 *         fee:
 *           type: number
 *           description: The course fee
 *           example: 1000
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           description: The status of the course
 *           example: "active"
 *     CourseResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the request was successful
 *           example: true
 *         message:
 *           type: string
 *           description: A message describing the result
 *           example: "Course created successfully!"
 *         data:
 *           $ref: '#/components/schemas/Course'
 *     CoursesResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the request was successful
 *           example: true
 *         message:
 *           type: string
 *           description: A message describing the result
 *           example: "Get all courses successfully!"
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Course'
 *     EnrolledUsersResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the request was successful
 *           example: true
 *         message:
 *           type: string
 *           description: A message describing the result
 *           example: "Get all courses successfully!"
 *         data:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c87"
 *               user_id:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c88"
 *               course_id:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *               status:
 *                 type: string
 *                 example: "approved"
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: API root endpoint
 *     tags: [General]
 *     responses:
 *       200:
 *         description: Welcome message
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Course Management service™ API"
 * 
 * /test:
 *   get:
 *     summary: Test endpoint
 *     tags: [General]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Test response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "COURSE SERVICE TEST ROUTE™ API"
 *                 data:
 *                   type: object
 *                   properties:
 *                     authPayload:
 *                       type: object
 *                       properties:
 *                         event:
 *                           type: string
 *                           example: "LOGIN"
 *                         data:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               nullable: true
 *                               example: "60d21b4667d0d8992e610c86"
 *                     lmsPayload:
 *                       type: object
 *                       properties:
 *                         event:
 *                           type: string
 *                           example: "SAMPLE"
 *                         data:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               example: "6600535b01e929e77376118d"
 *       401:
 *         description: Unauthorized
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
 *
 * /admin/courses:
 *   get:
 *     summary: Get all courses (Admin only)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all courses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoursesResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Admin access required
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
 * 
 * /admin/{_lecture}/courses:
 *   get:
 *     summary: Get courses by lecturer ID (Admin only)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _lecture
 *         required: true
 *         schema:
 *           type: string
 *         description: The lecturer ID
 *         example: "60d21b4667d0d8992e610c86"
 *     responses:
 *       200:
 *         description: List of courses for the specified lecturer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoursesResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Admin access required
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
 * 
 * /lecturer/courses:
 *   get:
 *     summary: Get courses for the authenticated lecturer
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of courses for the authenticated lecturer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoursesResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Lecturer access required
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
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseInput'
 *     responses:
 *       200:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseResponse'
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Lecturer access required
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
 * 
 * /lecturer/courses/students:
 *   get:
 *     summary: Get enrolled users for the lecturer's courses
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of enrolled users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnrolledUsersResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Lecturer access required
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
 * 
 * /lecturer/courses/{_id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *         example: "60d21b4667d0d8992e610c85"
 *     responses:
 *       200:
 *         description: Course details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Lecturer access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Course not found
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
 *   put:
 *     summary: Update a course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *         example: "60d21b4667d0d8992e610c85"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseInput'
 *     responses:
 *       200:
 *         description: Course updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseResponse'
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Lecturer access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Course not found
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
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *         example: "60d21b4667d0d8992e610c85"
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Lecturer access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Course not found
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

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import {Express} from "express";
import fs from 'fs';
import path from 'path';

// Load existing swagger.json if it exists
let existingSwagger = {};
const swaggerJsonPath = path.join(__dirname, '../swagger.json');
if (fs.existsSync(swaggerJsonPath)) {
    try {
        existingSwagger = JSON.parse(fs.readFileSync(swaggerJsonPath, 'utf8'));
    } catch (error) {
        console.error('Error reading swagger.json:', error);
    }
}

const options: swaggerJSDoc.Options = {
    definition: {
        ...existingSwagger, // Merge with existing swagger.json
        openapi: "3.0.0",
        info: {
            title: "Course Management Microservice API",
            version: "1.0.0",
            description: "API documentation for the Course Management microservice. This service handles course creation, management, and module organization.",
            contact: {
                name: "Development Team",
                email: "hansajith18@gmail.com",
                url: "https://github.com/IT21156410/CTSE-SE4010-Assignment-01"
            },
            termsOfService: "https://github.com/IT21156410/CTSE-SE4010-Assignment-01"
        },
        servers: [
            {
                url: "http://localhost:8002",
                description: "Local development server"
            },
            {
                url: "http://a1a03df15cb164aa380f63dc5d66a7ce-1963189570.ap-south-1.elb.amazonaws.com:8002",
                description: "AWS ELB Production server"
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ],
        tags: [
            {
                name: "General",
                description: "General endpoints"
            },
            {
                name: "Courses",
                description: "Course management endpoints"
            },
            {
                name: "Modules",
                description: "Module management endpoints"
            }
        ],
    },
    apis: ["./src/*.ts", "./src/routes/*.ts", "./src/models/*.ts", "./src/schemas/*.ts"], // path to files with annotations
};

const swaggerSpec = swaggerJSDoc(options);

// Write the generated swagger spec to file
fs.writeFileSync(swaggerJsonPath, JSON.stringify(swaggerSpec, null, 2));

export const setupSwagger = (app: Express) => {
    const swaggerUiOptions = {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: "Course Management Microservice API Documentation",
        customfavIcon: "https://nodejs.org/static/images/favicons/favicon.ico",
        swaggerOptions: {
            persistAuthorization: true,
            docExpansion: 'list',
            filter: true,
            displayRequestDuration: true
        }
    };

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

    // Endpoint to get the Swagger JSON
    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
};
