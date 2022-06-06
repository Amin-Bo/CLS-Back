const express = require('express');
const router = express.Router();
const SupplierController = require('../controllers/supplierController');
const passport = require('passport');

// Get all suppliers
router.get('/getAllSuppliers/', passport.authenticate('jwt', { session: false }),SupplierController.getAllSuppliers);
// Get expired suppliers
router.get('/getExpiredSuppliers/', passport.authenticate('jwt', { session: false }),SupplierController.getExpiredSuppliers);
// Get supplier by id
router.get('/getSupplierById/:id', passport.authenticate('jwt', { session: false }),SupplierController.getSupplierById);
// Update supplier
router.put('/updateSupplier/:id', passport.authenticate('jwt', { session: false }),SupplierController.updateSupplier);
// Add supplier
router.post('/addSupplier/', passport.authenticate('jwt', { session: false }),SupplierController.addSupplier);
// delete supplier
router.delete('/deleteSupplier/:id', passport.authenticate('jwt', { session: false }),SupplierController.deleteSupplier);


module.exports = router;
