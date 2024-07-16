const express= require('express');
const userRouter = express.Router();
const { updateAvatar, updateEmailUsername, getUser, deleteUser, getAllUsers, resetPassword } = require('../controllers/user.controller');
const fileUpload = require('../middleware/fileUpload');
const auth = require('../middleware/auth');
const adminSession = require('../middleware/adminSession');

/**
 * @swagger
 * /user/update:
 *   put:
 *     summary: Update the username or email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user  email / username were updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Some error happened
 */
userRouter.put('/update', auth, updateEmailUsername);

/**
 * @swagger
 * /user/reset-password:
 *   put:
 *     summary: Reset password
 *     tags: [Users]
 *     parameters:
 *       - currentPassword: sring
 *         newPassword: string
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The password was reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The password was not found
 *       500:
 *         description: Some error happened
 */
userRouter.put('/reset-password', auth, resetPassword);

/**
 * @swagger
 * /user/update-avatar:
 *   put:
 *     summary: Update Avatar
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The password was reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The password was not found
 *       500:
 *         description: Some error happened
 */
userRouter.put('/update-avatar', auth, fileUpload ,updateAvatar);

/**
 * @swagger
 * /user/all:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/all', adminSession, getAllUsers);

/**
 * @swagger
 * /user/:
 *   get:
 *     summary: Get a single user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The user was fetched
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
userRouter.get('/', auth, getUser);

/**
 * @swagger
 * /user/{id}/delete:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The user was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
userRouter.delete('/:id/delete', auth, deleteUser);

module.exports = userRouter;