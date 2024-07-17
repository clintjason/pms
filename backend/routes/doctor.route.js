const express = require('express');
const doctorRouter = express.Router();
const { updateDoctor, getDoctor } = require('../controllers/doctor.controller');
const doctorSession = require('../middleware/doctorSession');

/**
 * @swagger
 * /doctor/update/userId:
 *   post:
 *     summary: Update doctor request
 *     tags: [Doctor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Doctor'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Bad request
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
doctorRouter.put('/update/:userId', doctorSession, updateDoctor);

/**
 * @swagger
 * /doctor:
 *   get:
 *     summary: Get a doctor request
 *     tags: [Doctor]
 *     responses:
 *       201:
 *         description: The doctor was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Bad request
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
doctorRouter.get('/', doctorSession, getDoctor);

module.exports = doctorRouter;