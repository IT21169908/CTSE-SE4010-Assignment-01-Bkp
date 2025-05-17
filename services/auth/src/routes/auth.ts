import {Express, NextFunction, Request, Response} from 'express';
import AuthService from "../services/AuthService";
import User from "../schemas/User.schema";

export function AuthRoutesInit(app: Express, authService: AuthService) {
    /**
     * @swagger
     * /test:
     *   get:
     *     summary: Test the Auth Service
     *     tags: [General]
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
     *               - role
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
     *               role:
     *                 type: number
     *                 enum: [0, 1, 2]
     *                 description: User role (0=STUDENT, 1=ADMIN, 2=LECTURER)
     *                 example: 0
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
    /**
     * @swagger
     * /me:
     *   get:
     *     summary: Get current user information
     *     description: Retrieves the profile information of the currently authenticated user
     *     tags: [User]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: User profile retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   $ref: '#/components/schemas/User'
     *       401:
     *         description: Unauthorized - Invalid or missing token
     *       403:
     *         description: Forbidden - Not allowed to access this resource
     *       500:
     *         description: Internal server error
     */
    app.get('/me', authService.getSelf.bind(authService));

    /**
     * @swagger
     * /me:
     *   put:
     *     summary: Update current user information
     *     description: Updates the profile information of the currently authenticated user
     *     tags: [User]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       description: User information to update
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateUserRequest'
     *     responses:
     *       200:
     *         description: User profile updated successfully
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
     *                   example: "User updated successfully!"
     *                 data:
     *                   $ref: '#/components/schemas/User'
     *       401:
     *         description: Unauthorized - Invalid or missing token
     *       403:
     *         description: Forbidden - Not allowed to access this resource
     *       422:
     *         description: Validation error - Email already exists
     *       500:
     *         description: Internal server error
     */
    app.put('/me', authService.updateSelf.bind(authService));

    /**
     * @swagger
     * /me:
     *   delete:
     *     summary: Deactivate current user account
     *     description: Deactivates the account of the currently authenticated user
     *     tags: [User]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: User account deactivated successfully
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
     *                   example: "User deactivated successfully!"
     *                 data:
     *                   $ref: '#/components/schemas/User'
     *       401:
     *         description: Unauthorized - Invalid or missing token
     *       403:
     *         description: Forbidden - Not allowed to access this resource
     *       500:
     *         description: Internal server error
     */
    app.delete('/me', authService.deactivate.bind(authService));

}
