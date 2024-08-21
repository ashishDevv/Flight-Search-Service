const CrudRepository = require('./crud-repository');

const Airline = require('../models/airline');

class AirlineRepository extends CrudRepository {

    constructor() {
        super(Airline);
    }
}

module.exports = AirlineRepository;