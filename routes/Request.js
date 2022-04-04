const express = require('express');
const router = express.Router();
const RequestController = require('../controllers/requestsController');


// Get all requests
router.get('/getAllRequests/',RequestController.getAllRequests);
// Get request by id
router.get('/getRequestById/:id', RequestController.getRequestById);
// Update Status
router.post('/updateStatus/:id', RequestController.updateStatus);
// Previw PDF 
router.post('/preview/', RequestController.preview);
// get requests still in porgress
router.get('/getRequestsInProgress', RequestController.getRequestsInProgress);

module.exports = router;
