const { StatusCodes } = require('http-status-codes');
const { AirportRepository } = require('../repositories')
const AppError = require('../utils/errors/app-error')          //exported as default

const airportRepository = new AirportRepository();

async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data)
        return airport;
    } catch (error) {
       if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {  
            let explanation = [];                        
            error.errors.forEach((err) => {              
                explanation.push(err.message)            
            });
            throw new AppError( explanation , StatusCodes.BAD_REQUEST);       
        }
        throw new AppError('Cannot create new Airport', StatusCodes.INTERNAL_SERVER_ERROR); 
    }
}

async function getAirport(id){
    try {
        const airport = await airportRepository.get(id)
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw error;
        }
        throw new AppError('Cannot fetch required Airport', StatusCodes.INTERNAL_SERVER_ERROR); 
    }
}

async function getAllAirport() {
    try {
        const airport = await airportRepository.getAll()
        return airport;
    } catch (error) {
        throw new AppError('Cannot fetch all Airports', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteAirport(id) {
    try {
        const airport = await airportRepository.destroy(id)
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {    
            throw error;                                   
        }
        throw new AppError('Cannot delete required Airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirport(id, data) {           
    try {
        const airport = await airportRepository.update(id, data)
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {    
            throw error;                                   
        }
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {  
            let explanation = [];                        
            error.errors.forEach((err) => {               
                explanation.push(err.message)            
            });
            throw new AppError( explanation , StatusCodes.BAD_REQUEST);       
        }
        throw new AppError('Cannot update the required Airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirport,
    getAirport,
    getAllAirport,
    deleteAirport,
    updateAirport
}