
const express = require('express');
const router = express.Router();
const passport = require('passport');

///Controllers 
const AuthController = require('../controllers/authController');
const RequestController = require('../controllers/requestsController');
const EmployeeController = require('../controllers/employeeController');


//Login
router.post('/login', AuthController.login);
//Registration
router.post('/register',passport.authenticate('jwt', { session: false }), AuthController.register);
//Add Request
router.post('/addRequest', passport.authenticate('jwt', { session: false }), RequestController.addRequest);
//Get all requests
router.get('/getMyRequests/:id', passport.authenticate('jwt', { session: false }), RequestController.getMyRequests);
//Get requests by type
router.get('/getRequest/:type', passport.authenticate('jwt', { session: false }), RequestController.getRequest);
//Get  all employees
router.get('/getEmployees',passport.authenticate('jwt', { session: false }), EmployeeController.getEmployees);
//Get  employee by id
router.get('/getEmployeeById/:id',passport.authenticate('jwt', { session: false }), EmployeeController.getEmployeeById);
// update employee profile
router.put('/updateEmployeeProfile/:id',passport.authenticate('jwt', { session: false }), EmployeeController.updateEmployeeProfile);
// edit user
router.put('/editUser/:id',passport.authenticate('jwt', { session: false }), EmployeeController.editUser);

// update device id 
router.put('/updateDeviceId/:userId',passport.authenticate('jwt', { session: false }), EmployeeController.updateDeviceId);
router.put('/removeDeviceId/:userId',passport.authenticate('jwt', { session: false }), EmployeeController.removeDeviceId);
module.exports = router;

