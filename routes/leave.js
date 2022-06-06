const express = require('express');
const router = express.Router();
const multer = require('multer');
const leaveController = require('../controllers/leaveController')
const path = require('path');
const { nanoid } = require("nanoid")
const passport = require('passport');

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

router.post('/addLeave',passport.authenticate('jwt', { session: false }),multer({storage:storage}).single("file"),(req,res,next)=>{leaveController.addLeave(req,res,next);});
router.get('/getAllLeaves',passport.authenticate('jwt', { session: false }),leaveController.getAllLeaves);
router.get('/getArchivedLeaves',passport.authenticate('jwt', { session: false }),leaveController.getArchivedLeaves);
router.get('/getLeavesById/:id',passport.authenticate('jwt', { session: false }),leaveController.getLeavesById);
router.get('/getLeavesByUserId/:id',passport.authenticate('jwt', { session: false }),leaveController.getLeavesByUserId);
router.put('/updateStatus/:id',passport.authenticate('jwt', { session: false }),leaveController.updateStatus)
module.exports =router;