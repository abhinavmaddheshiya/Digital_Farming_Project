const express = require('express');
const router = express.Router();
const controller = require('./controller');


router.post('/signup',controller.FarmerSignup);
//routing for login
router.post('/login',controller.FarmerLogin);

module.exports = router;