const { StatusCodes } = require('http-status-codes');

const { ErrorResponse, SuccessResponse } = require('../utils/common')

const { FlightService } = require('../services');


/**
 * POST: /flights                           Admin route
 * req-body: {all fields are below}
 */

async function createFlight (req, res) {
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airlineCode: req.body.airlineCode,
            airplaneModel: req.body.airplaneModel,
            flightDate: req.body.flightDate,
            departureDateTime: req.body.departureDateTime,
            arrivalDateTime: req.body.arrivalDateTime,
            departureAirportCode: req.body.departureAirportCode,
            arrivalAirportCode: req.body.arrivalAirportCode,
        })
        SuccessResponse.data = flight;
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
 * GET: /flights                           All users route
 * 
 * req.query = {
 *    source: depature Airport code,
 *    desti: arrival airport code,
 *    travellers: No. of seats to be booked
 *    class: Seat class
 *    date: departure date of flight OR flightDate
 * }
 */
async function getAllFlights(req, res) {
    try {
        // const endingTime = " 23:59:00";
        const flight = await FlightService.getAllFlights({
            departureAirportCode: req.query.dept,
            arrivalAirportCode: req.query.arrv,
            flightDate: req.query.flightDate,
            class: req.query.class,
            noOfSeat: req.query.travellers
        })
        SuccessResponse.data = flight;
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
 * GET: /flights/:id        get flight by id                 Admin route
 * req-body: {}
 */

async function getFlight(req, res) {
    try {
        const flight = await FlightService.getFlight(req.params.id);
        SuccessResponse.data = flight;
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
 * DELETE: /flights/:id        delete flight by id            Admin route
 * req-body: {}
 */

async function deleteFlight(req, res) {
    try {
        const flight = await FlightService.deleteFlight(req.params.id);
        SuccessResponse.data = flight;
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
 * PATCH: /flights/:id        delete flight by id            Admin route
 * req-body: { data to update }     
 */

async function updateFlight(req, res) {
    try {
        const flight = await FlightService.updateFlight(req.params.id, req.customData);
        SuccessResponse.data = flight;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } 
    catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    deleteFlight,
    updateFlight
}