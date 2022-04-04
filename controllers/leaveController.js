const Leave = require('../models/leave');
const moment = require('moment');
const mongoose = require('mongoose');
exports.addLeave = (req, res) => {
    const start = moment(req.body.leave_start_date);
    const end = moment(req.body.leave_end_date);
    days_count = end.diff(start, 'days')+1;
    const newLeave = new Leave();
    newLeave.from = req.body.from;
    newLeave.sent_date = moment(Date.now()).format('YYYY-MM-DD[T00:00:00.000Z]');
    newLeave.leave_start_date = start.format('YYYY-MM-DD[T00:00:00.000Z]');
    newLeave.leave_end_date = end.format('YYYY-MM-DD[T00:00:00.000Z]');
    newLeave.leave_days = days_count;
    newLeave.type = req.body.type;
    if (req.file) {
        newLeave.file = req.file.filename;
    }
    newLeave.save((err, leave) => {
        if (err) {
            res.status(500).send({ added : false });
        } else {
            res.status(200).send({ added : true });
        }});
    
}

exports.getAllLeaves = (req, res) => {
    Leave.find({}, (err, leaves) => {
        if (err) {
            res.status(500).send({ message: err.message });
        } else {
            res.status(200).send(leaves);
        }
    }).populate('from','firstName lastName');
}

exports.getLeavesById = (req, res) => {
    Leave.findById(req.params.id, (err, leave) => {
        if (err) {
            res.status(500).send({ message: err.message });
        } else {
            res.status(200).send(leave);
        }
    }).populate('from','firstName lastName');
}

exports.getLeavesByUserId = (req, res) => {
    Leave.find({from:req.params.id}, (err, leaves) => {
        if (err) {
            res.status(500).send({ message: err.message });
        } else {
            res.status(200).send(leaves);
        }
    }).populate('from','firstName lastName');
}

exports.updateStatus = (req, res) => {
    Leave.findOneAndUpdate({_id:req.params.id},{status:req.body.status},(err,leave)=>{
        if(err){
            res.status(500).send({message:err.message});
        }else{
            res.status(200).send({updated:true});
        }
    })
}