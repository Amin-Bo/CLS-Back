const express = require('express');
const router = express.Router();
const multer = require('multer');
const contractController = require('../controllers/contractController')
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../assets/contracts/'));
    },
    filename: function (req, file, cb) {
        if(file){
            const name = file.originalname.toLowerCase().split(' ').join('-');
            cb(null, Date.now()+ '-' +name);
        }
    }
});

router.post('/addContract',multer({storage:storage}).single("pdf"),(req,res,next)=>{contractController.addContract(req,res,next);});
router.put('/updateContract/:id',contractController.updateContract)
router.get('/getAllContracts',contractController.getAllContracts)
router.get('/getContractById/:id',contractController.getContractById)
router.get('/getContractBySupplierId/:id',contractController.getContractBySupplierId)
module.exports =router;