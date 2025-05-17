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
 *           example: "An error occurred"
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The user ID
 *           example: "60d21b4667d0d8992e610c85"
 *         name:
 *           type: string
 *           description: The user's name
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email
 *           example: "john.doe@example.com"
 *         phone:
 *           type: string
 *           description: The user's phone number
 *           example: "+1234567890"
 *         role:
 *           type: number
 *           description: The user's role (0=STUDENT, 1=ADMIN, 2=LECTURER)
 *           example: 0
 *           enum: [0, 1, 2]
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *             enum: ["CREATE_COURSE", "UPDATE_COURSE", "DELETE_COURSE", "ENROLL_COURSE"]
 *           description: The user's permissions
 *           example: ["ENROLL_COURSE"]
 *         lastLogin:
 *           type: string
 *           format: date-time
 *           description: The user's last login date
 *           example: "2023-01-01T00:00:00Z"
 *         isActive:
 *           type: boolean
 *           description: Whether the user is active
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was created
 *           example: "2023-01-01T00:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was last updated
 *           example: "2023-01-01T00:00:00Z"
 *     UpdateUserRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email
 *           example: "john.doe@example.com"
 *         phone:
 *           type: string
 *           description: The user's phone number
 *           example: "+1234567890"
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           format: password
 *           description: User's password
 *           example: "myStrongPassword123"
 *     LoginResponse:
 *       type: object
 *       properties:
 *         user:
 *           $ref: '#/components/schemas/User'
 *         token:
 *           type: string
 *           description: JWT token for authentication
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     RegisterStudentRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the student
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the student
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           format: password
 *           description: Password for the student
 *           example: "mySecurePassword"
 *         role:
 *           type: number
 *           enum: [0]
 *           description: User role (0=STUDENT)
 *           example: 0
 *     RegisterLecturerRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the lecturer
 *           example: "Jane Smith"
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the lecturer
 *           example: "jane.smith@example.com"
 *         password:
 *           type: string
 *           format: password
 *           description: Password for the lecturer
 *           example: "mySecurePassword"
 *         role:
 *           type: number
 *           enum: [2]
 *           description: User role (2=LECTURER)
 *           example: 2
 *     RegisterAdminRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the admin
 *           example: "Admin User"
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the admin
 *           example: "admin@example.com"
 *         password:
 *           type: string
 *           format: password
 *           description: Password for the admin
 *           example: "mySecurePassword"
 *         role:
 *           type: number
 *           enum: [1]
 *           description: User role (1=ADMIN)
 *           example: 1
 *     RegisterResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the newly created user
 *           example: "60d21b4667d0d8992e610c85"
 *         name:
 *           type: string
 *           description: Name of the registered user
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           description: Email of the registered user
 *           example: "john.doe@example.com"
 *         role:
 *           type: number
 *           description: Role of the registered user
 *           example: 0
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: API root endpoint
 *     tags: [General]
 *     x-order: 0
 *     responses:
 *       200:
 *         description: Welcome message
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Auth service™ API"
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
            title: "Auth Microservice API",
            version: "1.0.0",
            description: "API documentation for the Auth microservice. This service handles user authentication, registration, and profile management. Works in conjunction with the Course Management service for a complete learning platform.",
            contact: {
                name: "Development Team",
                email: "hansajith18@gmail.com",
                url: "https://github.com/IT21156410/CTSE-SE4010-Assignment-01"
            },
            termsOfService: "https://github.com/IT21156410/CTSE-SE4010-Assignment-01"
        },
        servers: [
            {
                url: "http://localhost:8001",
                description: "Local development server"
            },
            {
                url: "http://a7a5a2e8c13e64370819601c6a21ecd0-1066139683.ap-south-1.elb.amazonaws.com:8001",
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
                "name": "Auth Service",
                "description": "Authentication APIs"
            },
            {
                name: "General",
                description: "General endpoints for service health and information"
            },
            {
                name: "Auth",
                description: "Authentication endpoints for login and registration"
            },
            {
                name: "User",
                description: "User profile management endpoints"
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
        customSiteTitle: "Auth Microservice API Documentation",
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
