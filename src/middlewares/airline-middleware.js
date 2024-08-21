const { StatusCodes } = require('http-status-codes');

const { ErrorResponse, SuccessResponse } = require('../utils/common');

const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
    if((!req.body.airlineCode) || (!req.body.airlineName) ) {
        ErrorResponse.message = 'Bad request done by client';          
        ErrorResponse.error = new AppError(['Airline Code or Airline Name are not specified'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }
    next();
}

function validateUpdateRequest(req, res, next) {
    const updateData = {};
    if(req.body.airlineCode){
        updateData.airlineCode = req.body.airlineCode
    }
    if(req.body.airlineName) {
        updateData.airlineName = req.body.airlineName
    }
    if((!req.body.airlineCode) && (!req.body.airlineName) ) {
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