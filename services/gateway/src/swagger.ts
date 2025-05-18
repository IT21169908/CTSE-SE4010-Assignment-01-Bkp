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
import axios from 'axios';
import {merge} from 'lodash';

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

// Generate initial swagger spec from annotations
const baseSwaggerSpec = swaggerJSDoc(options);

// Function to fetch swagger specs from microservices
const fetchServiceSwagger = async (serviceUrl: string, basePath: string) => {
    try {
        console.log(`Fetching swagger from ${serviceUrl}/swagger.json`);
        const response = await axios.get(`${serviceUrl}/swagger.json`, {
            timeout: 5000, // 5 second timeout
            validateStatus: (status) => status === 200 // Only accept 200 OK responses
        });

        const serviceSpec = response.data;
        console.log(`Successfully fetched swagger from ${serviceUrl}`);

        // Modify paths to include the basePath
        if (serviceSpec.paths) {
            const modifiedPaths: any = {};
            Object.keys(serviceSpec.paths).forEach(path => {
                // Skip the root path as it's already documented in the gateway
                if (path === '/') return;

                // Add the basePath to each path
                modifiedPaths[`${basePath}${path}`] = serviceSpec.paths[path];
            });

            // Replace the original paths with the modified ones
            serviceSpec.paths = modifiedPaths;
        }

        return serviceSpec;
    } catch (error: any) {
        if (error.code === 'ECONNREFUSED') {
            console.error(`Connection refused when fetching swagger from ${serviceUrl}. Service may be down.`);
        } else if (error.code === 'ETIMEDOUT') {
            console.error(`Connection timed out when fetching swagger from ${serviceUrl}. Service may be slow or down.`);
        } else if (error.response) {
            console.error(`Error fetching swagger from ${serviceUrl}: Status ${error.response.status} - ${error.response.statusText}`);
        } else {
            console.error(`Error fetching swagger from ${serviceUrl}:`, error.message || error);
        }
        return null;
    }
};

// Function to merge all swagger specs
const mergeSwaggerSpecs = async () => {
    const authUrl = process.env.AUTH_BASE_URL || "http://localhost:8001";
    const courseUrl = process.env.COURSE_BASE_URL || "http://localhost:8002";
    const forumUrl = process.env.LMS_BASE_URL || "http://localhost:8003";

    console.log('Merging Swagger specs from services:');
    console.log(`- Auth service: ${authUrl}`);
    console.log(`- Course service: ${courseUrl}`);
    console.log(`- Forum service: ${forumUrl}`);

    try {
        // Fetch swagger specs from each service
        // Using Promise.allSettled instead of Promise.all to handle partial failures
        const results = await Promise.allSettled([
            fetchServiceSwagger(authUrl, '/api/auth'),
            fetchServiceSwagger(courseUrl, '/api/course'),
            fetchServiceSwagger(forumUrl, '/api/forum')
        ]);

        // Extract specs from successful promises
        const specs = results.map((result, index) => {
            if (result.status === 'fulfilled' && result.value) {
                const serviceName = ['Auth', 'Course', 'Forum'][index];
                console.log(`Successfully merged ${serviceName} service Swagger spec`);
                return result.value;
            } else {
                const serviceName = ['Auth', 'Course', 'Forum'][index];
                console.warn(`Failed to fetch Swagger spec from ${serviceName} service. This service's endpoints will not be included in the documentation.`);
                return null;
            }
        });

        // Merge all specs into the base spec
        const mergedSpec = merge({}, baseSwaggerSpec) as swaggerJSDoc.SwaggerDefinition;
        let mergedCount = 0;

        // Merge paths and components from each service
        specs.forEach((spec, index) => {
            if (spec) {
                const serviceName = ['Auth', 'Course', 'Forum'][index];

                // Merge paths
                if (spec.paths) {
                    const pathCount = Object.keys(spec.paths).length;
                    console.log(`Merging ${pathCount} paths from ${serviceName} service`);
                    mergedSpec.paths = merge(mergedSpec.paths || {}, spec.paths);
                }

                // Merge components (schemas, securitySchemes, etc.)
                if (spec.components) {
                    console.log(`Merging components from ${serviceName} service`);
                    mergedSpec.components = merge(mergedSpec.components || {}, spec.components);
                }

                // Merge tags (avoiding duplicates)
                if (spec.tags) {
                    const existingTagNames = (mergedSpec.tags || []).map((tag: { name: string }) => tag.name);
                    let newTagCount = 0;

                    spec.tags.forEach((tag: { name: string }) => {
                        if (!existingTagNames.includes(tag.name)) {
                            mergedSpec.tags = mergedSpec.tags || [];
                            mergedSpec.tags = (mergedSpec.tags || []).concat(tag);
                            newTagCount++;
                        }
                    });

                    console.log(`Merged ${newTagCount} new tags from ${serviceName} service`);
                }

                mergedCount++;
            }
        });

        console.log(`Successfully merged Swagger specs from ${mergedCount} out of 3 services`);
        return mergedSpec;
    } catch (error: any) {
        console.error('Error merging swagger specs:', error.message || error);
        console.warn('Falling back to base Swagger spec without microservice endpoints');
        return baseSwaggerSpec;
    }
};

export const setupSwagger = async (app: Express) => {
    // Get the merged swagger spec that includes all microservices
    const mergedSwaggerSpec = await mergeSwaggerSpecs();

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
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(mergedSwaggerSpec, swaggerUiOptions));

    // Endpoint to get the Swagger JSON at /docs/swagger.json
    app.get('/docs/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(mergedSwaggerSpec);
    });

    // Also expose Swagger JSON at /swagger.json for consistency with microservices
    // This makes it easier to debug and test
    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(mergedSwaggerSpec);
    });

    console.log('Swagger documentation endpoints set up:');
    console.log('- /docs: Swagger UI');
    console.log('- /docs/swagger.json: Swagger JSON');
    console.log('- /swagger.json: Swagger JSON (for API consumption)');
};
