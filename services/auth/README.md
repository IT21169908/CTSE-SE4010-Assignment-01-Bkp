# Auth Service Swagger Documentation

This document provides information about the Swagger (OpenAPI 3.0) documentation for the Auth microservice.

## Overview

The Auth microservice provides authentication and user management functionality for the application. The API is documented using Swagger (OpenAPI 3.0) and can be accessed through the Swagger UI.

## Accessing the Documentation

The Swagger documentation is available at the following endpoints:

- **Swagger UI**: `/api-docs`
- **Swagger JSON**: `/swagger.json`

## Authentication

The API uses JWT Bearer token authentication. To authenticate:

1. Obtain a token by calling the `/login` endpoint
2. Include the token in the Authorization header of subsequent requests:
   ```
   Authorization: Bearer <your_token>
   ```

## Endpoints

### Auth Endpoints

- `GET /test` - Test the Auth Service
- `POST /login` - Login a user
- `POST /register` - Register a new user (Student, Lecturer, or Admin)

### User Endpoints

- `GET /me` - Get current user information
- `PUT /me` - Update current user information
- `DELETE /me` - Deactivate current user account

## Models

The API uses the following main models:

- **User** - Base user model with common properties
- **Student** - Extends User with student-specific properties
- **Lecturer** - Extends User with lecturer-specific properties
- **Admin** - Extends User with admin-specific properties

## Registration Flows

The registration process varies depending on the user role:

1. **Student Registration**:
   - Requires: name, email, password, role (0)
   - Optional: remember

2. **Lecturer Registration**:
   - Requires: name, email, password, role (1), facultyId
   - Optional: remember

3. **Admin Registration**:
   - Requires: name, email, password, role (2), adminId, nic, superAdminToken
   - Optional: remember

## Implementation Details

The Swagger documentation is implemented using:

- `swagger-jsdoc` - For generating Swagger specs from JSDoc comments
- `swagger-ui-express` - For serving the Swagger UI

The documentation is generated from:
- JSDoc annotations in the code
- The swagger.json file at the root of the auth service

When the application starts, it:
1. Loads the existing swagger.json file
2. Merges it with the Swagger specs generated from JSDoc annotations
3. Writes the updated specs back to the swagger.json file
4. Sets up the Swagger UI at /api-docs

## Development

When adding new endpoints or models:

1. Add JSDoc annotations to the relevant files
2. The swagger.json file will be automatically updated when the application starts
3. Access the Swagger UI to verify the documentation

Example JSDoc annotation:

```javascript
/**
 * @swagger
 * /example:
 *   get:
 *     summary: Example endpoint
 *     tags: [Example]
 *     responses:
 *       200:
 *         description: Success
 */
```