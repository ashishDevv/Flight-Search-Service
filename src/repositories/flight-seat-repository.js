const CrudRepository = require('./crud-repository');

const FlightSeat = require('../models/flight-seat');
const AppError = require('../utils/errors/app-error');

class FlightSeatRepository extends CrudRepository {

    constructor() {
        super(FlightSeat);
    }

    async updateFlightSeats(data, flightId, seatClass) {

        let response;
        if (data.increment) {
            response = FlightSeat.increment( seatClass, {
                by: data.noOfSeats, where: {flightId: flightId}
            })
        }
        else {
            response = FlightSeat.decrement( seatClass, {
                by: data.noOfSeats, where: {flightId: flightId }
            })
        }
        if(!response) {                        
            throw new AppError('Not able to find the resource to update', StatusCodes.NOT_FOUND);
        }
        return response;

    }

    async getByFlightId(flightId) {
        const flightSeat = await FlightSeat.findOne({
            where: {
                flightId: flightId
            }
        })
        if(!flightSeat) {
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
        }
        return flightSeat;
    }

    async deleteByFlightId(flightId) {
       
        const response = await FlightSeat.destroy({
            where: {
                flightId: flightId
                }
            });
            if(!response) {                   
                throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
            }
            return response;
    }

    async updateSeatPrice(data, seatClassName) {
        const response = await FlightSeat.update({seatClassName: data.price}, {
            where: {
                flightId: data.flightId
            }
        })
        if(response.length === 1 && response[0] === 0) {
            throw new AppError('Not able to find the resource to update', StatusCodes.NOT_FOUND);
        }
        return response
    }
}

module.exports = FlightSeatRepository;