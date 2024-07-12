const express = require('express');
const router = express.Router();
const appointmentCtrl = require('../controllers/appointment.ctrl');
const auth = require('../middleware/auth');

router.post('/new', auth, appointmentCtrl.createAppointment);
router.get('/', auth, appointmentCtrl.getAllAppointments);
router.get('/search', auth, appointmentCtrl.searchInAppointments);
router.get('/:id', auth, appointmentCtrl.getAppointment);
router.put('/edit/:id', auth, appointmentCtrl.editAppointment);
router.delete('/delete/:id', auth, appointmentCtrl.deleteAppointment);

module.exports = router;
