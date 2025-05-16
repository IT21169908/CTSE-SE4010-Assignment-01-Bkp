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
import { Express } from "express";

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
    ],
  },
  apis: ["./src/*.ts", "./src/routes/*.ts", "./src/models/*.ts"], // path to files with annotations
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
