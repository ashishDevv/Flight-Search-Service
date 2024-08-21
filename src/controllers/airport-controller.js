const { StatusCodes } = require('http-status-codes');

const { ErrorResponse, SuccessResponse } = require('../utils/common')

const { AirportService } = require('../services');

/**
 * POST: /airports
 * req-body: {airportCode, airportName, cityId}
 */

async function createAirport (req, res) {
    try {
        const airport = await AirportService.createAirport({
            airportCode: req.body.airportCode,
            airportName: req.body.airportName,
            city: req.body.city,
            country: req.body.country
        })
        SuccessResponse.data = airport;
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
 * GET: /airports/:id
 * req-body: {}
 */

async function getAirport (req, res) {
    try {
        const airport = await AirportService.getAirport(req.params.id)
        SuccessResponse.data = airport;
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
 * GET: /airports
 * req-body: {}
 */

async function getAllAirport (req, res) {
    try {
        const airport = await AirportService.getAllAirport()
        SuccessResponse.data = airport;
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
 * DELETE: /airports/:id
 * req-body: {}
 */

async function deleteAirport (req, res) {
    try {
        const airport = await AirportService.deleteAirport(req.params.id)
        SuccessResponse.data = airport;
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
 * UPDATE: /airports/:id
 * req-body: { airportCode/airportName/cityId }
 */

async function updateAirport (req, res) {
    try {
        const airport = await AirportService.updateAirport(req.params.id, req.updateData)
        SuccessResponse.data = airport;
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
    createAirport,
    getAirport,
    getAllAirport,
    deleteAirport,
    updateAirport
}

