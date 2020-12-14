const express = require("express");
const router = express.Router();
const { signIn, signUp, token } = require("./auth.ctrl");

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/token", token);

module.exports = router;

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     tags: [Auth]
 *     summary: 로그인
 *     description: ""
 *     parameters:
 *       - name: "email"
 *         in: "string"
 *         description: "User Email"
 *         required: true
 *         type: "string"
 *         format: "string"
 *       - name: "pw"
 *         in: "string"
 *         description: "User Password"
 *         required: true
 *         type: "string"
 *         format: "string"
 *     schema:
 *       $ref: "#/definitions/User"
 *     consumes: "application/json"
 *     produces: "application/json"
 *     responses:
 *       200:
 *         description: Success(성공)
 *       400:
 *         description: Bad request (잘못된 요청)
 *       500:
 *         description: Interval Server Error
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: 회원가입
 *     description: ""
 *     parameters:
 *       - name: "request"
 *         in: "body"
 *         description: "user object that needs to be added"
 *         required: true
 *         schema:
 *           $ref: "#/definitions/User"
 *     consumes: "multipart/form-data"
 *     produces: "multipart/form-data"
 *     responses:
 *       200:
 *         description: Success(성공)
 *       400:
 *         description: Bad request (잘못된 요청)
 *       500:
 *         description: Interval Server Error
 */

/**
 * @swagger
 * /auth/token:
 *   post:
 *     tags: [Auth]
 *     summary: accessToken 토큰 재발급
 *     description: "accessToken 토큰 만료시 refreshToken으로 재발급"
 *     parameters:
 *       - name: "refreshToken"
 *         in: "string"
 *         description: "리프레시 토큰"
 *         required: true
 *         type: "string"
 *         format: "string"
 *     consumes: "application/json"
 *     produces: "application/json"
 *     responses:
 *       200:
 *         description: Success(성공)
 *       400:
 *         description: Bad request (잘못된 요청)
 *
 *       500:
 *         description: Interval Server Error
 */
