const express= require('express');
const vitalSignSimulatorRouter = express.Router();
const auth = require('../middleware/auth');
const vitalSignSimulatorCtrl = require("../controllers/vitalsignsimulator.ctrl.js");

/**
 * @swagger
 * /vital-sign-simulator-api/temperature:
 *   get:
 *     summary: Temperatutre Simulator API endpoint
 *     tags: [Vital Sign Simulator]
 *     responses:
 *       201:
 *         description: The Temperature was successfully simulated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VitalSign'
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
vitalSignSimulatorRouter.get('/temperature', auth, vitalSignSimulatorCtrl.generateTemperature);

/**
 * @swagger
 * /vital-sign-simulator-api/heartrate:
 *   get:
 *     summary: Heart rate simulator API endpoint
 *     tags: [Vital Sign Simulator]
 *     responses:
 *       201:
 *         description: The Heart Rate was successfully simulated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VitalSign'
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
vitalSignSimulatorRouter.get('/heartrate', auth, vitalSignSimulatorCtrl.generateHeartRate);

/**
 * @swagger
 * /vital-sign-simulator-api/respiratoryrate:
 *   get:
 *     summary: Respiration Rate Simulator API endpoint
 *     tags: [Vital Sign Simulator]
 *     responses:
 *       201:
 *         description: The Respiration Rate was successfully simulated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VitalSign'
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
vitalSignSimulatorRouter.get('/respiratoryrate', auth, vitalSignSimulatorCtrl.generateRespiratoryRate);

/**
 * @swagger
 * /vital-sign-simulator-api/:
 *   post:
 *     summary: Vital Sign Simulator API endpoint
 *     tags: [Vital Sign Simulator]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             temperatureType: string
 *     responses:
 *       201:
 *         description: Vital Signs  successfully simulated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VitalSign'
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
vitalSignSimulatorRouter.post('/', auth, vitalSignSimulatorCtrl.generateVitalSigns);

/**
 * @swagger
 * /vital-sign-simulator-api:
 *   get:
 *     summary: Get all Vital Signs
 *     tags: [Vital Sign Simulator]
 *     responses:
 *       201:
 *         description: The Vital signs were successfully fetched
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VitalSign'
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
vitalSignSimulatorRouter.get('/', auth, vitalSignSimulatorCtrl.getAllVitalSigns);

/**
 * @swagger
 * /vital-sign-simulator-api/patient-vitals:
 *   post:
 *     summary: Get a patient Vital Signs
 *     tags: [Vital Sign Simulator]
 *     responses:
 *       201:
 *         description: The Vital signs were successfully fetched
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VitalSign'
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
vitalSignSimulatorRouter.post('/patient-vitals', auth, vitalSignSimulatorCtrl.getPatientVitalSigns);


module.exports = vitalSignSimulatorRouter;
