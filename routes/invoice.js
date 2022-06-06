const express = require('express');
const multer = require('multer');
const router = express.Router();
const passport = require('passport');


const invoiceController = require('../controllers/invoiceController')
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../assets/invoices/'));
    },
    filename: function (req, file, cb) {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now()+ '-' +name);
    }
});


router.post('/addInvoice',passport.authenticate('jwt', { session: false }),multer({storage:storage}).single("pdf"),(req,res,next)=>{invoiceController.addInvoice(req,res,next);})
router.get('/getAllInvoices',passport.authenticate('jwt', { session: false }),invoiceController.getAllInvoices)
router.get('/getInvoiceById/:id',passport.authenticate('jwt', { session: false }),invoiceController.getInvoiceById)
router.get('/getInvoiceBySupplierId/:id',passport.authenticate('jwt', { session: false }),invoiceController.getInvoiceBySupplierId)
router.get('/InvoicesStatistiques',passport.authenticate('jwt', { session: false }),invoiceController.InvoicesStatistiques)
router.get('/InvoicesStatistiquesByDateRange/:minDate/:maxDate',passport.authenticate('jwt', { session: false }),invoiceController.InvoicesStatistiquesByDateRange)
router.get('/InvoicesStatistiquesByYear/:year',passport.authenticate('jwt', { session: false }),invoiceController.InvoicesStatistiquesByYear)
router.get('/StatsBySupplier/:id',passport.authenticate('jwt', { session: false }),invoiceController.StatsBySupplier)
module.exports =router;