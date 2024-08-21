const sequelize = require('./index');
const { DataTypes } = require('sequelize');

const Airport = sequelize.define(
    'Airport', 
    {
        airportCode: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        airportName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {}
    
  );

  Airport.sync()
               .then(() => { console.log("Airport Model Sync Completed")})
               .catch((err) => {console.log("Error in Syncing of Airport Model", err);}) 

  module.exports = Airport;