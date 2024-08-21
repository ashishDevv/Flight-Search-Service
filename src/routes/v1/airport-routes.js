const express = require('express');

const { AirportController } = require('../../controllers')

const { AirportMiddleware } = require('../../middlewares')

const router = express.Router();

router.get('/:id', AirportController.getAirport);

router.get('/', AirportController.getAllAirport);

router.post('/', AirportMiddleware.validateCreateRequest, AirportController.createAirport );   // here use validate middleware

router.delete('/:id', AirportController.deleteAirport);

router.patch('/:id', AirportMiddleware.validateUpdateRequest, AirportController.updateAirport );

module.exports = router;
