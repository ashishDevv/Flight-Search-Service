const { StatusCodes } = require('http-status-codes');
const { FlightRepository } = require('../repositories')
const AppError = require('../utils/errors/app-error')          //exported as default

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data)
        return flight;
    } catch (error) {
       if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {  
            let explanation = [];                        
            error.errors.forEach((err) => {              
                explanation.push(err.message)            
            });
            throw new AppError( explanation , StatusCodes.BAD_REQUEST);       
        }
        throw new AppError('Cannot create new Flight', StatusCodes.INTERNAL_SERVER_ERROR); 
    }
}

async function getAllFlights(data) {
    try {
        const flight = await flightRepository.getAllFlights(data);
        return flight;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw error
        } 
        throw new AppError('Cannot fetch required Flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id){
    try {
        const flight = await flightRepository.ge(id);
        return flight;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw error;
        }
        throw new AppError('Cannot fetch required Flight', StatusCodes.INTERNAL_SERVER_ERROR); 
    }
}

// async function getAllAirport() {
//     try {
//         const flight = await airportRepository.getAll()
//         return flight;
//     } catch (error) {
//         throw new AppError('Cannot fetch all Airports', StatusCodes.INTERNAL_SERVER_ERROR);
//     }
// }

async function deleteFlight(id) {
    try {
        const flight = await flightRepository.destroy(id);
        return flight;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {    
            throw error;                                   
        }
        throw new AppError('Cannot delete required Flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateFlight(id, data) {           
    try {
        const flight = await flightRepository.update(id, data)
        return flight;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {    //first it find the flight id , if not found, then through this error
            throw error;                                   
        }
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {  
            let explanation = [];                        
            error.errors.forEach((err) => {               // if any validation errors occur during updating data , through this error, sequelize through these errors
                explanation.push(err.message)            
            });
            throw new AppError( explanation , StatusCodes.BAD_REQUEST);       
        }
        throw new AppError('Cannot update the required Flight', StatusCodes.INTERNAL_SERVER_ERROR);     // if any other thing happens , through this
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    deleteFlight,
    updateFlight
}