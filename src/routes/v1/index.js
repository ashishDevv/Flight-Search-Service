const express = require('express');

const airportRoutes = require('./airport-routes')
const airlineRoutes = require('./airline-routes')
const flightRoutes = require('./flight-routes')
const flightSeatRoutes = require('./flight-seat-routes')
const flightSearchRoute = require('./user-flight-search-route')

const router = express.Router();

router.use('/admin/airports', airportRoutes );

router.use('/admin/airlines', airlineRoutes );

router.use('/admin/flights', flightRoutes );

router.use('/admin/flight-seats', flightSeatRoutes );

router.use('/user/search', flightSearchRoute );

//router.use('/bookings', bookingRoutes)
//router.use('/payments', paymentRoutes)  // In this way we redirect to different routes from here

module.exports = router;
