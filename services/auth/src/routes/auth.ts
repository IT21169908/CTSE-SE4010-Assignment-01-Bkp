/**
 * @swagger
 * tags:
 *   - name: Auth Service
 *     description: Authentication APIs
 */

import {Express, NextFunction, Request, Response} from 'express';
import AuthService from "../services/AuthService";
import User from "../schemas/User.schema";

export function AuthRoutesInit(app: Express, authService: AuthService) {
    /**
     * @swagger
     * /test:
     *   get:
     *     summary: Test the Auth Service
     *     tags: [Auth]
     *     responses:
     *       200:
     *         description: Successfully tested
     *       401:
     *         description: Unauthorized access
     */
    app.get('/test', authService.tester.bind(authService));
    /**
     * @swagger
     * /login:
     *   post:
     *     summary: Login a user
     *     tags: [Auth]
     *     requestBody:
     *       description: User credentials for authentication
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - password
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *                 description: User's email address
     *                 example: user@example.com
     *               password:
     *                 type: string
     *                 format: password
     *                 description: User's password
     *                 example: myStrongPassword123
     *     responses:
     *       200:
     *         description: Login successful
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 token:
     *                   type: string
     *                   description: JWT token for the logged-in user
     *       401:
     *         description: Invalid credentials
     */
    app.post('/login', authService.loginUser.bind(authService));
    /**
     * @swagger
     * /register:
     *   post:
     *     summary: Register a new user
     *     tags: [Auth]
     *     requestBody:
     *       description: Registration data
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *               - email
     *               - password
     *             properties:
     *               name:
     *                 type: string
     *                 description: Name of the user
     *                 example: John Doe
     *               email:
     *                 type: string
     *                 format: email
     *                 description: Email address of the user
     *                 example: john.doe@example.com
     *               password:
     *                 type: string
     *                 format: password
     *                 description: Password for the user
     *                 example: mySecurePassword
     *     responses:
     *       201:
     *         description: User successfully registered
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                   description: The ID of the newly created user
     *                   example: 1234567890abcdefg
     *                 name:
     *                   type: string
     *                   description: Name of the registered user
     *                   example: John Doe
     */
    app.post('/register', authService.registerUser.bind(authService));
    // app.post('/forgot-password', authService.forgotPassword.bind(authService));
    // app.post('/reset-password', authService.resetPassword.bind(authService));
    // app.get('/token-validate/:token', authService.tokenValidate.bind(authService));
    // app.get('/logout', authService.logout.bind(authService));

    // /* AUTH ROUTES ===================================== */
    app.get('/me', authService.getSelf.bind(authService));
    app.put('/me', authService.updateSelf.bind(authService));
    app.delete('/me', authService.deactivate.bind(authService));

}
