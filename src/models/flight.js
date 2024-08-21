const sequelize = require('./index');
const { DataTypes } = require('sequelize');
const Airport = require('./airport');
const Airline = require('./airline')

const Flight = sequelize.define(
    'Flight', 
    {
        flightNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        airlineCode: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Airline,
                key: 'airlineCode'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        airplaneModel: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        flightDate: {                     // like 24 Feb 2015 => 24022015
            type: DataTypes.STRING,       // we do non-cluster indexing on it
            allowNull: false,
        },
        departureDateTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        arrivalDateTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        departureAirportCode: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Airport,
                key: 'airportCode'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        arrivalAirportCode: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Airport,
                key: 'airportCode'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
    }, {}
    
);

Flight.belongsTo(Airline, {
    foreignKey: 'airlineCode'
});

Flight.belongsTo(Airport, { 
    as: 'departureAirport', 
    foreignKey: 'departureAirportCode' 
});

Flight.belongsTo(Airport, { 
    as: 'arrivalAirport', 
    foreignKey: 'arrivalAirportCode' 
});

Flight.sync()
            .then(() => { console.log("Flight Model Sync Completed")})
            .catch((err) => {console.log("Error in Syncing of Flight Model", err);})

module.exports = Flight;