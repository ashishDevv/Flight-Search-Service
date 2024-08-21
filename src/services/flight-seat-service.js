const { StatusCodes } = require('http-status-codes');
const { FlightSeatRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const axios = require('axios');  

const flightSeatRepo = new FlightSeatRepository();

async function updateFlightSeats(data) {             //update seat quantity in flight-seat table
    let seatClass;
    if(data.class === 'ECONOMY') {
        seatClass = 'ecoSeat';
    }
    if(data.class === 'PREMIUM') {
        seatClass = 'preSeat';
    }
    if(data.class === 'BUSINESS') {
        seatClass = 'busSeat';
    }
    const flightId = data.flightId;
    
    if(data.increment === "true" ) {
        data.increment = true;
    }
    if(data.increment === "false" ) {
        data.increment = false;
    }
    
    try {
        const response = await flightSeatRepo.updateFlightSeats(data, flightId, seatClass);
        return response;
    } 
    catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw error;
        }
        throw new AppError("Failed to update flight Seats Quntity", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


async function createFlightSeat(data) {
    try {
        const flightSeat = await flightSeatRepo.create(data)
        return flightSeat;
    } 
    catch (error) {
       if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {  
            let explanation = [];                        
            error.errors.forEach((err) => {              
                explanation.push(err.message)            
            });
            throw new AppError( explanation , StatusCodes.BAD_REQUEST);       
        }
        throw new AppError('Cannot create new FlightSeat', StatusCodes.INTERNAL_SERVER_ERROR); 
    }
}

async function getFlightSeat(flightId){           //we use get by flightId method here, not by it own id
    try {
        const flightSeat = await flightSeatRepo.getByFlightId(flightId)
        return flightSeat;
    } 
    catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw error;
        }
        throw new AppError('Cannot fetch required Flight Seat', StatusCodes.INTERNAL_SERVER_ERROR); 
    }
}

async function getAllFlightSeat() {
    try {
        const response = await flightSeatRepo.getAll()
        return response;
    } 
    catch (error) {
        throw new AppError('Cannot fetch all Flight Seats', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteFlightSeat(flightId) {            //we use delete by flightId method here, not by it own id
    try {
        const response = await flightSeatRepo.deleteByFlightId(flightId)
        return response;
    } 
    catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {    
            throw error;                                   
        }
        throw new AppError('Cannot delete required Flight Seat', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateSeatPrice(data) {
    const seatClassName = `${data.class}Price`        //seat class name with Price
    try {
        const response = await flightSeatRepo.updateSeatPrice(data, seatClassName);
        
        //Api call to flight-booking microservice to update price of respective seats
        const priceUpdateResponse = await axios.patch('http://localhost:4000/api/v1/admin/seats/update-price', {
            flightId: data.flightId,
            class: data.class,
            price: data.price
        })
        console.log("Seat update response of booking service", priceUpdateResponse);
        console.log("Seat update response of this(search service) service",response);
        
        return response;
    } catch (error) {
        console.log("Error during updating seat price ",error);
        throw error;
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

