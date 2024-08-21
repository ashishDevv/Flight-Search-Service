const { StatusCodes } = require('http-status-codes');

const dateTimeCompare = require('../utils/helpers/date-time-comparison')

const { ErrorResponse, SuccessResponse } = require('../utils/common');

const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
    if((!req.body.flightNumber) || (!req.body.airlineCode) || (!req.body.flightDate) || 
       (!req.body.departureDateTime) || (!req.body.arrivalDateTime) || (!req.body.departureAirportCode) || (!req.body.arrivalAirportCode)) {
        ErrorResponse.message = 'Bad request done by client';          
        ErrorResponse.error = new AppError(['one or more fields are not specified'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }
    next();
}
function validateDeptArrivalTime(req, res, next) {
    const deptDt = req.body.departureDateTime;
    const arrivalDt = req.body.arrivalDateTime;
    if(dateTimeCompare(deptDt, arrivalDt)) {
        ErrorResponse.message = 'Bad request done by client';          
        ErrorResponse.error = new AppError(['Departure Time should be less then Arrival Time'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }
    next();
}

function validateUpdateRequest(req, res, next) {
    const data = {};
    if(req.body.airplaneModel){
        data.airplaneModel = req.body.airplaneModel
    }
    if(req.body.flightDate){
        data.flightDate = req.body.flightDate
    }
    if(req.body.departureDateTime){
        data.departureDateTime = req.body.departureDateTime
    }
    if(req.body.arrivalDateTime){
        data.arrivalDateTime = req.body.arrivalDateTime
    }
    if(req.body.departureAirportCode){
        data.departureAirportCode = req.body.departureAirportCode
    }
    if(req.body.arrivalAirportCode){
        data.arrivalAirportCode = req.body.arrivalAirportCode
    }
    if((req.body.departureDateTime) && (req.body.arrivalDateTime)){
        if(dateTimeCompare(req.body.departureDateTime, req.body.arrivalDateTime)){
            ErrorResponse.message = 'Bad request done by client';          
            ErrorResponse.error = new AppError(['Departure Time should be less then Arrival Time'], StatusCodes.BAD_REQUEST);
            return res
                    .status(StatusCodes.BAD_REQUEST)
                    .json(ErrorResponse)
        }
    }
    if((!req.body.airplaneModel) && (!req.body.flightDate) && (!req.body.departureDateTime) && 
       (!req.body.arrivalDateTime) && (!req.body.departureAirportCode) && (!req.body.arrivalAirportCode)) {
        ErrorResponse.message = 'Bad request done by client';          
        ErrorResponse.error = new AppError(['Nothing specified to Update'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }
    
    req.customData = data;

    next();
}

module.exports = {
    validateCreateRequest,
    validateDeptArrivalTime,
    validateUpdateRequest
}