const { StatusCodes } = require('http-status-codes');

const { ErrorResponse, SuccessResponse } = require('../utils/common')

const { FlightSeatService } = require('../services');

/**
 * PATCH: /flight-seats
 * req-body: { flightId: id of flight, 
 *            class: eco/pre/bus  (only in this format), 
 *            noOfSeats: integer, 
 *            increment: boolean
 * }
 */

async function updateFlightSeats(req, res) {
    try {
        const response = await FlightSeatService.updateFlightSeats({
            flightId: req.body.flightId,
            class: req.body.class,
            noOfSeats: req.body.noOfSeats,
            increment: req.body.increment
        });
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

/**
 * POST: /flight-seats
 * req-body: {flightId, ecoSeat, preSeat, busSeat, ecoPrice, prePrice, busPrice}
 */

async function createFlightSeat (req, res) {
    try {
        const flightSeat = await FlightSeatService.createFlightSeat({   //implement short method
            flightId: req.body.flightId,
            ecoSeat: req.body.ecoSeat,
            preSeat: req.body.preSeat,
            busSeat: req.body.busSeat,
            ecoPrice: req.body.ecoPrice,
            prePrice: req.body.prePrice,
            busPrice: req.body.busPrice
        })
        SuccessResponse.data = flightSeat;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

/**
 * GET: /flight-seat/:id          here id is flightId, NOT flight_Seat_Id
 * req-body: {}
 */

async function getFlightSeat (req, res) {
    try {
        const flightSeat = await FlightSeatService.getFlightSeat(req.params.id)
        SuccessResponse.data = flightSeat;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

/**
 * GET: /flight-seats
 * req-body: {}
 */

async function getAllFlightSeat (req, res) {
    try {
        const flightSeat = await FlightSeatService.getAllFlightSeat()
        SuccessResponse.data = flightSeat;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

/**
 * DELETE: /flight-seats/:id                 here id is flightId, NOT flight_Seat_Id
 * req-body: {}
 */

async function deleteFlightSeat (req, res) {
    try {
        const response = await FlightSeatService.deleteFlightSeat(req.params.id)
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

/**
 * PATCH: /flight-seats/price                 
 * req-body: { flightId, class, price}
 */

async function updateSeatPrice (req, res) {
    try {
        const response = await FlightSeatService.updateSeatPrice({
            flightId: req.body.flightId,
            class: req.body.class,
            price: req.body.price
        })
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports = {
    updateFlightSeats,
    createFlightSeat,
    getFlightSeat,
    getAllFlightSeat,
    deleteFlightSeat,
    updateSeatPrice
}