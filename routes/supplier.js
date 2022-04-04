const express = require('express');
const router = express.Router();
const SupplierController = require('../controllers/supplierController');

// Get all suppliers
router.get('/getAllSuppliers/', SupplierController.getAllSuppliers);
// Get supplier by id
router.get('/getSupplierById/:id', SupplierController.getSupplierById);
// Update supplier
router.put('/updateSupplier/:id', SupplierController.updateSupplier);
// Add supplier
router.post('/addSupplier/', SupplierController.addSupplier);
// delete supplier
router.delete('/deleteSupplier/:id', SupplierController.deleteSupplier);


module.exports = router;
