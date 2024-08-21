const { StatusCodes } = require('http-status-codes');
const { AirlineRepository } = require('../repositories')
const AppError = require('../utils/errors/app-error')          //exported as default

const airlineRepo = new AirlineRepository();

async function createAirline(data) {
    try {
        const airline = await airlineRepo.create(data)
        return airline;
    } catch (error) {
       if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {  
            let explanation = [];                        
            error.errors.forEach((err) => {              
                explanation.push(err.message)            
            });
            throw new AppError( explanation , StatusCodes.BAD_REQUEST);       
        }
        throw new AppError('Cannot create new Airline', StatusCodes.INTERNAL_SERVER_ERROR); 
    }
}

async function getAirline(id){
    try {
        const airline = await airlineRepo.get(id)
        return airline;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw error;
        }
        throw new AppError('Cannot fetch required Airline', StatusCodes.INTERNAL_SERVER_ERROR); 
    }
}

async function getAllAirline() {
    try {
        const airline = await airlineRepo.getAll()
        return airline;
    } catch (error) {
        throw new AppError('Cannot fetch all Airlines', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteAirline(id) {
    try {
        const airline = await airlineRepo.destroy(id)
        return airline;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {    
            throw error;                                   
        }
        throw new AppError('Cannot delete required Airline', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirline(id, data) {           
    try {
        const airline = await airlineRepo.update(id, data)
        return airline;
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
        throw new AppError('Cannot update the required Airline', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createAirline,
    getAirline,
    getAllAirline,
    deleteAirline,
    updateAirline
}