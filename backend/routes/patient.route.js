const express = require('express');
const patientRouter = express.Router();
const { updatePatient, getPatient, getAllPatients } = require('../controllers/patient.controller');
const auth = require('../middleware/auth');
const doctorSession = require('../middleware/doctorSession');

/**
 * @swagger
 * /patient/update/:userId:
 *   post:
 *     summary: Update patient request
 *     tags: [Patient]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
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
patientRouter.put('/update/:userId', auth, updatePatient);


/**
 * @swagger
 * /patient:
 *   get:
 *     summary: Get a patient request
 *     tags: [Patient]
 *     responses:
 *       201:
 *         description: The doctor was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
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
patientRouter.get('/', auth, getPatient);

/**
 * @swagger
 * /patient/all:
 *   get:
 *     summary: Get all patients request
 *     tags: [Patient]
 *     responses:
 *       201:
 *         description: The patients list was successfully fetched
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
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
patientRouter.get('/all/:search?', doctorSession, getAllPatients);

module.exports = patientRouter;