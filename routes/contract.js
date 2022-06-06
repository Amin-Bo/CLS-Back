const express = require('express');
const router = express.Router();
const multer = require('multer');
const contractController = require('../controllers/contractController')
const path = require('path');
const passport = require('passport');


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

router.post('/addContract',passport.authenticate('jwt', { session: false }),multer({storage:storage}).single("pdf"),(req,res,next)=>{contractController.addContract(req,res,next);});
router.put('/updateContract/:id',passport.authenticate('jwt', { session: false }),contractController.updateContract)
router.get('/getAllContracts',passport.authenticate('jwt', { session: false }),contractController.getAllContracts)
router.get('/getExpiredContracts',passport.authenticate('jwt', { session: false }),contractController.getExpiredContracts)
router.get('/getContractById/:id',passport.authenticate('jwt', { session: false }),contractController.getContractById)
router.get('/getContractBySupplierId/:id',passport.authenticate('jwt', { session: false }),contractController.getContractBySupplierId)
module.exports =router;