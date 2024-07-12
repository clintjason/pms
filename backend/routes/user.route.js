const express= require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controller');
const fileUpload = require('../middleware/fileUpload');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /user/{id}/edit:
 *   put:
 *     summary: Update the user by the id
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
 *         description: The user was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Some error happened
 */
userRouter.put('/user/:id/edit', auth, fileUpload, userController.updateUser);

/**
 * @swagger
 * /user/:
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
userRouter.get('/user/all', auth, userController.getUsers);

/**
 * @swagger
 * /user/{id}:
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
userRouter.get('/user/:id', auth, userController.getOneUser);

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
userRouter.delete('/:id/delete', auth, userController.deleteUser);

module.exports = userRouter;