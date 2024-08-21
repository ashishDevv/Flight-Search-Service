const express = require('express');

const { FlightSeatController } = require('../../controllers')

// const { FlightMiddleware } = require('../../middlewares')

const router = express.Router();

router.patch('/', FlightSeatController.updateFlightSeats);    // change it to update with flightId as well 

router.get('/:id', FlightSeatController.getFlightSeat);      //here id is flightId , NOT flight_Seat_Id

router.get('/', FlightSeatController.getAllFlightSeat);

router.post('/', FlightSeatController.createFlightSeat);   

// router.delete('/:id', FlightSeatController.deleteFlightSeat);       //here id is flightId , NOT flight_Seat_Id

router.patch('/price', FlightSeatController.updateSeatPrice); 

module.exports = router;