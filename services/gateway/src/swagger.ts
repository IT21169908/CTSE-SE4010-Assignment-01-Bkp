/**
 * @swagger
 * /:
 *   get:
 *     summary: API Gateway root endpoint
 *     tags: [General]
 *     x-order: 0
 *     responses:
 *       200:
 *         description: Information about available services
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Gateway™ API"
 *                 documentation:
 *                   type: string
 *                   example: "http://localhost:80/docs"
 *                   description: "URL to the API documentation"
 *                 services:
 *                   type: object
 *                   description: "Available microservices"
 * /api/auth:
 *   get:
 *     summary: Auth Service Proxy
 *     description: Proxies requests to the Auth microservice
 *     tags: [Gateway]
 *     x-order: 1
 *     responses:
 *       200:
 *         description: Successful response from Auth service
 * /api/course:
 *   get:
 *     summary: Course Service Proxy
 *     description: Proxies requests to the Course Management microservice
 *     tags: [Gateway]
 *     responses:
 *       200:
 *         description: Successful response from Course service
 * /api/forum:
 *   get:
 *     summary: Forum Service Proxy
 *     description: Proxies requests to the Forum microservice
 *     tags: [Gateway]
 *     responses:
 *       200:
 *         description: Successful response from Forum service
 * /api/notification:
 *   get:
 *     summary: Notification Service Proxy
 *     description: Proxies requests to the Notification microservice
 *     tags: [Gateway]
 *     responses:
 *       200:
 *         description: Successful response from Notification service
 */

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express, {Express} from "express";
import path from 'path';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Gateway API",
            version: "1.0.0",
            description: "API Gateway documentation for the microservices platform. This gateway routes requests to various microservices including Auth, Course, Forum, and Notification services.",
            contact: {
                name: "Development Team",
                url: "https://github.com/IT21156410/CTSE-SE4010-Assignment-01"
            },
            termsOfService: "https://github.com/IT21156410/CTSE-SE4010-Assignment-01"
        },
        servers: [
            {
                url: process.env.GATEWAY_URL || "http://localhost:8000",
                description: "Gateway server"
            }
        ],
        tags: [
            {
                name: "General",
                description: "General endpoints for service health and information"
            },
            {
                name: "Gateway",
                description: "Gateway service endpoints"
            }
        ],
    },
    apis: ["./src/*.ts"], // path to files with annotations
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
    const swaggerUiOptions = {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: "API Gateway Documentation",
        customfavIcon: "https://nodejs.org/static/images/favicons/favicon.ico",
        swaggerOptions: {
            persistAuthorization: true,
            docExpansion: 'list',
            filter: true,
            displayRequestDuration: true
        }
    };

    // This serves Swagger UI static files
    app.use('/swagger-ui', express.static(require('swagger-ui-dist').absolutePath()));

    // Serve Swagger UI at /docs
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

    // Endpoint to get the Swagger JSON at /docs/swagger.json
    app.get('/docs/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
};
