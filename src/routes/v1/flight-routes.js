const express = require('express');

const { FlightController } = require('../../controllers')

const { FlightMiddleware } = require('../../middlewares')

const router = express.Router();


router.get('/', FlightController.getAllFlights);

router.post('/',FlightMiddleware.validateCreateRequest, FlightMiddleware.validateDeptArrivalTime, FlightController.createFlight);

router.get('/:id', FlightController.getFlight);

router.delete('/:id', FlightController.deleteFlight);

router.patch('/:id',FlightMiddleware.validateUpdateRequest, FlightController.updateFlight);

module.exports = router;