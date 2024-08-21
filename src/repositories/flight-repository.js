const { StatusCodes } = require('http-status-codes');
const CrudRepository = require('./crud-repository');

const { Op } = require('sequelize');
const Flight = require('../models/flight');
const FlightSeat = require('../models/flight-seat');
const AppError = require('../utils/errors/app-error');


class FlightRepository extends CrudRepository {

    constructor() {
        super(Flight);
    }

    async getAllFlights (data) {
        const seatClass = `${data.class}Seat`

        // const seatCondition = {                                   you can use a seat conditon object for more readable Dynamic query
        //     [seatClass]: { [Op.gte]: data.noOfSeat }
        // };
        
        const flight = await Flight.findAll({
            where: {
                departureAirportCode: data.departureAirportCode,
                arrivalAirportCode: data.arrivalAirportCode,
                flightDate: data.flightDate,
            },
            include: {
                model: FlightSeat,
                where: {
                    [seatClass]: { [Op.gte]: data.noOfSeat }
                },
                required: true
            }  
        })
        if(!flight || flight.length === 0) {
            throw new AppError('No Flight Available for given Conditions', StatusCodes.NOT_FOUND);
        }
        return flight;
    }
    
}

module.exports = FlightRepository;