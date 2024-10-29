const express = require('express');
const userController = require('../controllers/user');
const authController = require('../controllers/auth');

const router = express.Router();

// ROUTES FOR USERS
router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/car-listings', userController.createCarListing)
router.get('/car-listings/:carId', userController.getCarListingDetails)
router.get('/car-listings', userController.searchCarListings)
router.patch('/update-password', authController.updatePassword)

module.exports = router;