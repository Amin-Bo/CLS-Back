const express = require('express');
const multer = require('multer');
const router = express.Router();


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


router.post('/addInvoice',multer({storage:storage}).single("pdf"),(req,res,next)=>{invoiceController.addInvoice(req,res,next);})
router.get('/getAllInvoices',invoiceController.getAllInvoices)
router.get('/getInvoiceById/:id',invoiceController.getInvoiceById)
router.get('/getInvoiceBySupplierId/:id',invoiceController.getInvoiceBySupplierId)
router.get('/InvoicesStatistiques',invoiceController.InvoicesStatistiques)
router.get('/InvoicesStatistiquesByDateRange/:minDate/:maxDate',invoiceController.InvoicesStatistiquesByDateRange)
router.get('/InvoicesStatistiquesByYear/:year',invoiceController.InvoicesStatistiquesByYear)
router.get('/StatsBySupplier/:id',invoiceController.StatsBySupplier)
module.exports =router;