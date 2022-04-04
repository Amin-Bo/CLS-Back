const express = require('express');
const router = express.Router();
const multer = require('multer');
const leaveController = require('../controllers/leaveController')
const path = require('path');
const { nanoid } = require("nanoid")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../assets/leaves/'));
    },
    filename: function (req, file, cb) {
        if (file) {
            const name = file.originalname.toLowerCase().split(' ').join('-');
            cb(null, nanoid()+ '-' +name);         
        }
    }
});

router.post('/addLeave',multer({storage:storage}).single("file"),(req,res,next)=>{leaveController.addLeave(req,res,next);});
router.get('/getAllLeaves',leaveController.getAllLeaves);
router.get('/getLeavesById/:id',leaveController.getLeavesById);
router.get('/getLeavesByUserId/:id',leaveController.getLeavesByUserId);
router.put('/updateStatus/:id',leaveController.updateStatus)
module.exports =router;