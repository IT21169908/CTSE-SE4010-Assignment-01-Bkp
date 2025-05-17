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
        openapi: "3.0.0",
        info: {
            title: "Auth Microservice API",
            version: "1.0.0",
            description: "API documentation for the Auth microservice.",
        },
        servers: [
            {
                url: "http://localhost:8001",
            },
            {
                url: "http://k8s-default-authserv-2eab4279c2-3e2e1a8573b10dd1.elb.ap-south-1.amazonaws.com:8001",
            },
        ],
        ...existingSwagger, // Merge with existing swagger.json
    },
    apis: ["./src/*.ts", "./src/routes/*.ts", "./src/models/*.ts", "./src/schemas/*.ts"], // path to files with annotations
};

const swaggerSpec = swaggerJSDoc(options);

// Write the generated swagger spec to file
fs.writeFileSync(swaggerJsonPath, JSON.stringify(swaggerSpec, null, 2));

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Endpoint to get the Swagger JSON
    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
};
