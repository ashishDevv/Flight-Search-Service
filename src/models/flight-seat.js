const sequelize = require('./index');
const { DataTypes } = require('sequelize');
const Flight = require('./flight');

const FlightSeat = sequelize.define(
    'FlightSeat', 
    {
        flightId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Flight,
                key: 'id',
              },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        ecoSeat: {                     //Number of avalaible economy seats
            type: DataTypes.INTEGER,
            allowNull: false
        },
        preSeat: {                     //Number of avalaible premuim seats
            type: DataTypes.INTEGER,
            allowNull: false
        },
        busSeat: {                     //Number of avalaible business seats
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ecoPrice: {                        //Price of economy seat
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        prePrice: {                        //Price of premium seat
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        busPrice: {                        //Price of business seat
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {}
    
  );

FlightSeat.belongsTo(Flight, { foreignKey: 'flightId' });
Flight.hasOne(FlightSeat, { foreignKey: 'flightId' });

FlightSeat.sync()
            .then(() => { console.log("FlightSeat Model Sync Completed")})
            .catch((err) => {console.log("Error in Syncing of FlightSeat Model", err);})

module.exports = FlightSeat;