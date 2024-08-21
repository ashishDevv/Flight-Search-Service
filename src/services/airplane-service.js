// const { StatusCodes } = require('http-status-codes');
// const { AirplaneRepository } = require('../repositories')
// const AppError = require('../utils/errors/app-error')              //exported as default

// const airplaneRepo = new AirplaneRepository(); //making object of class AirplaneRepository

// async function createAirplane(data) {
//     try {
//         const airplane = await airplaneRepo.create(data);
//         return airplane;
//     } catch (error) {
//         if(error.name == 'SequelizeValidationError') {
//             let explanation = [];                       //we make array bcoz, validation multiple attributes par ho sakti hai , aur agar multipe attributes
//             error.errors.forEach((err) => {             // mein galat data input kiya hai toh , it will throw (from repository) objects for each validation error,
//                 explanation.push(err.message)           // through which we can traverse and just store their message part in our array and give it to frontend
//             });
//             throw new AppError(explanation , StatusCodes.BAD_REQUEST);       //message me 'explanation' array pass kar dege
//         }
//         throw new AppError('Cannot create a new Airplane', StatusCodes.INTERNAL_SERVER_ERROR);
//     }
// }



// async function deleteAirplane(id) {             // delete by id
//     try {
//         const airplane = await airplaneRepo.destroy(id);
//         return airplane;
//     } catch (error) {
//         if(error.statusCode == StatusCodes.NOT_FOUND) {    // if error comes of 404, throw it, AS IT IS , as we configure it in repository
//             throw error;                                   
//         }
//         throw new AppError('Cannot delete required Airplane', StatusCodes.INTERNAL_SERVER_ERROR);  // if some other error comes from repositry
//     }
// }



// async function getAirplane(id) {    //get by primary key
//     try {
//         const airplane = await airplaneRepo.get(id);
//         return airplane;
//     } catch (error) {
//         if(error.statusCode == StatusCodes.NOT_FOUND) {    // if error comes of 404, throw it as it is , as we configure it in repository
//             throw error;
//         }
//         throw new AppError('Cannot fetch required Airplane', StatusCodes.INTERNAL_SERVER_ERROR); // if some other error comes from repositry
//     }
// }



// async function getAllAirplane() {  
//     try {
//         const airplane = await airplaneRepo.getAll();   //it will return an array from repository
//         return airplane;
//     } catch (error) {
//         throw new AppError('Cannot fetch all Airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
//     }
// }



// async function updateAirplane(id, data){
//     try {
//         const airplane = await airplaneRepo.update(id, data);
//         return airplane;
//     } catch (error) {
//         if(error.statusCode == StatusCodes.NOT_FOUND) {    
//             throw error;                                   
//         }
//         throw new AppError('Cannot update the required Airplane', StatusCodes.INTERNAL_SERVER_ERROR);
//     }
// }

// module.exports = {
//     createAirplane,
//     deleteAirplane,
//     getAirplane,
//     getAllAirplane,
//     updateAirplane
// }