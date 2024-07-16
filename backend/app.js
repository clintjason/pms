const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const db = require("./models");
require('dotenv').config();
const userRoutes = require('./routes/user.route.js');
const authRoutes = require('./routes/auth.route.js');
const patientRoutes = require('./routes/patient.route.js');
const doctorRoutes = require('./routes/doctor.route.js');
const vitalSignSimulatorRoutes = require('./routes/vitalsignsimulator.route.js');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');

const app = express();

/* const db = require("./models"); */
app.use(express.json())

app.use(cors())
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

app.use(express.urlencoded({ extended: true }))

db.connection.sync().then(()=> console.log('DB is ready'));

/* app.use('/api/appointments', appointmentRoutes);
 */
app.use('/auth/', authRoutes);
app.use('/user/', userRoutes);
app.use('/patient/', patientRoutes);
app.use('/doctor/', doctorRoutes);
app.use('/vital-sign-simulator-api/', vitalSignSimulatorRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
module.exports = app;