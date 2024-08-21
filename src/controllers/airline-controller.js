const { StatusCodes } = require('http-status-codes');

const { ErrorResponse, SuccessResponse } = require('../utils/common')

const { AirlineService } = require('../services');

/**
 * POST: /airlines
 * req-body: {airlineCode, airlineName}
 */

async function createAirline (req, res) {
    try {
        const airline = await AirlineService.createAirline({
            airlineCode: req.body.airlineCode,
            airlineName: req.body.airlineName
        })
        SuccessResponse.data = airline;
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
 * GET: /airlines/:id
 * req-body: {}
 */

async function getAirline (req, res) {
    try {
        const airline = await AirlineService.getAirline(req.params.id)
        SuccessResponse.data = airline;
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
 * GET: /airlines
 * req-body: {}
 */

async function getAllAirline (req, res) {
    try {
        const airline = await AirlineService.getAllAirline()
        SuccessResponse.data = airline;
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
 * DELETE: /airlines/:id
 * req-body: {}
 */

async function deleteAirline (req, res) {
    try {
        const airline = await AirlineService.deleteAirline(req.params.id)
        SuccessResponse.data = airline;
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
 * UPDATE: /airlines/:id
 * req-body: { airlineCode/airlineName}
 */

async function updateAirline (req, res) {
    try {
        const airline = await AirlineService.updateAirline(req.params.id, req.updateData)
        SuccessResponse.data = airline;
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
    createAirline,
    getAirline,
    getAllAirline,
    deleteAirline,
    updateAirline
}