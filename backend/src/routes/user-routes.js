const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/user-controllers.js');

// handle incoming requests via controller functions
router.get('/', ctrl.getAllUsers);            // GET /api/finances/users
router.post('/signup', ctrl.userSignUp);      // POST /api/finances/users/signup
router.post('/login',  ctrl.userLogIn);       // POST /api/finances/users/login


module.exports = router;