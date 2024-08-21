const sequelize = require('./index');
const { DataTypes } = require('sequelize');

const Airline = sequelize.define(
    'Airline', 
    {
        airlineCode: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        airlineName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {}
    
  );

  Airline.sync()
               .then(() => { console.log("Airline Model Sync Completed")})
               .catch((err) => {console.log("Error in Syncing of Airline Model", err);}) 

  module.exports = Airline;