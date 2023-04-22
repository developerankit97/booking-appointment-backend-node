const express = require('express');

const router = express.Router();
const appointmentController = require('../controllers/appointmentContoller');

router.get('/', appointmentController.getAllController);

router.post('/appointments', appointmentController.postAddController);

router.get('/appointments/:id', appointmentController.getSingleAppointmentController);

router.put('/appointments/:id', appointmentController.putUpdateController);

router.delete('/appointments/:id', appointmentController.deleteController);

module.exports = router;