const express = require('express');
const router = express.Router();
const RequestController = require('../controllers/requestsController');
const passport = require('passport');


// Get all requests
router.get('/getAllRequests/',passport.authenticate('jwt', { session: false }),RequestController.getAllRequests);
//Get Archived requests
router.get('/getArchivedRequests/',passport.authenticate('jwt', { session: false }),RequestController.getArchivedRequests);
// Get request by id
router.get('/getRequestById/:id', passport.authenticate('jwt', { session: false }),RequestController.getRequestById);
// Update Status
router.post('/updateStatus/:id', passport.authenticate('jwt', { session: false }),RequestController.updateStatus);
// Decline
router.put('/declineRequest/:id', passport.authenticate('jwt', { session: false }),RequestController.declineRequest);
// Previw PDF 
router.post('/preview/',passport.authenticate('jwt', { session: false }), RequestController.preview);
// get requests still in porgress
router.get('/getRequestsInProgress', passport.authenticate('jwt', { session: false }),RequestController.getRequestsInProgress);

module.exports = router;
