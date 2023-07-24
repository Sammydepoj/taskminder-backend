/**
 * @swagger
 * components:
 *   schemas:
 *     Signup:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - username
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         email:
 *           type: string
 *           description: unique email of the user
 *         username:
 *           type: string
 *           description: unique username of the user
 *         password:
 *           type: string
 *           description: a secret key for user authentication
 *       example:
 *         email: ""
 *         username: ""
 *         password: ""
 *     Signin:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         email:
 *           type: string
 *           description: unique email of the user
 *         password:
 *           type: string
 *           description: a secret key for user authentication
 *       example:
 *         email: ""
 *         password: ""
 *     Otp verification:
 *       type: object
 *       required:
 *         - otp
 *       properties:
 *         otp:
 *           type: string
 *           description: a six digit code sent to user mail inbox
 *       example:
 *         otp: 0
 *     Profile Image Upload:
 *       type: object
 *       required:
 *         - profileImage
 *       properties:
 *         profileImage:
 *           type: string
 *           description: url to the image link
 *       example:
 *         profileImage: ""
 */

/**
 * @swagger
 * tags:
 *   name: authentication-controller
 *   description: Authentication controller
 * /api/v1/authentication/signup:
 *       post:
 *          summary: register a new user
 *          tags: [authentication-controller]
 *          requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                  schema:
 *                   $ref: '#/components/schemas/Signup'
 *          responses:
 *             200:
 *               description: The created user.
 *               content:
 *                  application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/Signup'
 *             500:
 *               description: Some server error
 * /api/v1/authentication/signin:
 *       post:
 *          summary: Login to your account
 *          tags: [authentication-controller]
 *          requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                  schema:
 *                   $ref: '#/components/schemas/Signin'
 *          responses:
 *             200:
 *               description: The existing user.
 *               content:
 *                  application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/Signin'
 *             500:
 *               description: Some server error
 * /api/v1/authentication/otpVerification:
 *       post:
 *          summary: Verify your email address
 *          tags: [authentication-controller]
 *          requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                  schema:
 *                   $ref: '#/components/schemas/Otp verification'
 *          responses:
 *             200:
 *               description: Verify your email address.
 *               content:
 *                  application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/Otp verification'
 *             500:
 *               description: Some server error
 * /api/v1/authentication/uploadProfileImage:
 *       post:
 *          summary: upload your profile image
 *          tags: [authentication-controller]
 *          requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                  schema:
 *                   $ref: '#/components/schemas/Profile Image Upload'
 *          responses:
 *             200:
 *               description: upload your profile image.
 *               content:
 *                  application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/Profile Image Upload'
 *             500:
 *               description: Some server error
 *
 */

const express = require("express");
const { signUp } = require("../controllers/signup.controller");
const { signin } = require("../controllers/signin.controller");
const { otpVerification } = require("../controllers/otpVerification");
const { uploadProfileImage } = require("../controllers/uploadProfileImage");
const { auth } = require("../middleware/Authentiation");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signin);
router.post("/otpVerification", otpVerification);
router.post("/uploadProfileImage", auth, uploadProfileImage)

exports.authentication = router;
