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
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The user ID
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email
 *         phone:
 *           type: string
 *           description: The user's phone number
 *         role:
 *           type: number
 *           description: The user's role
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *           description: The user's permissions
 *         lastLogin:
 *           type: string
 *           format: date-time
 *           description: The user's last login date
 *         isActive:
 *           type: boolean
 *           description: Whether the user is active
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was last updated
 *     UpdateUserRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email
 *         phone:
 *           type: string
 *           description: The user's phone number
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
            description: "API documentation for the Auth microservice. This service handles user authentication, registration, and profile management.",
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
