const { StatusCodes } = require('http-status-codes');

const { ErrorResponse, SuccessResponse } = require('../utils/common');

const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
    if((!req.body.airportCode) || (!req.body.airportName) || (!req.body.city) || (!req.body.country)) {
        ErrorResponse.message = 'Bad request done by client';          
        ErrorResponse.error = new AppError(['One or Many fields are not specified'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }
    next();
}

function validateUpdateRequest(req, res, next) {
    const updateData = {};
    if(req.body.airportCode){
        updateData.airportCode = req.body.airportCode
    }
    if(req.body.airportName) {
        updateData.airportName = req.body.airportName
    }
    if(req.body.city){
        updateData.city = req.body.city
    }
    if(req.body.country) {
        updateData.country = req.body.country
    }
    if((!req.body.airportCode) && (!req.body.airportName) && (!req.body.city) && (!req.body.country)) {
        ErrorResponse.message = 'Bad request done by client';          
        ErrorResponse.error = new AppError(['Nothing specified to Update'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }

    req.updateData = updateData;

    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateRequest
}