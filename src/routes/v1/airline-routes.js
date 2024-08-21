const express = require('express');

const { AirlineController } = require('../../controllers');

const { AirlineMiddleware } = require('../../middlewares');

const router = express.Router();

router.get('/:id', AirlineController.getAirline);

router.get('/', AirlineController.getAllAirline);

router.post('/', AirlineMiddleware.validateCreateRequest, AirlineController.createAirline );   // here use validate middleware

router.delete('/:id', AirlineController.deleteAirline);

router.patch('/:id', AirlineMiddleware.validateUpdateRequest, AirlineController.updateAirline );

module.exports = router;