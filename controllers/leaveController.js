const Leave = require('../models/leave');
const User = require('../models/users');
const moment = require('moment');
const PDFAdmin = require('../pdf/adminValidation');
const notification = require('../models/notification');
const pushNotificationController = require('./push-notification.Controller');
exports.addLeave = (req, res) => {
    const start = moment(req.body.leave_start_date);
    const end = moment(req.body.leave_end_date);
    days_count = end.diff(start, 'days') + 1;
    User.findOne({
        _id: req.body.from
    }, (err, user) => {
        user.leaves_left = user.leaves_left - days_count;
        user.save((err, user) => {
            const newLeave = new Leave();
            newLeave.from = req.body.from;
            newLeave.sent_date = moment(Date.now()).format('YYYY-MM-DD[T00:00:00.000Z]');
            newLeave.leave_start_date = start.format('YYYY-MM-DD[T00:00:00.000Z]');
            newLeave.leave_end_date = end.format('YYYY-MM-DD[T00:00:00.000Z]');
            newLeave.leave_days = days_count;
            newLeave.type = req.body.type;
            if (req.file) {
                let fileExtension = req.file.originalname.split('.').pop();
                if (fileExtension === 'pdf') {
                    newLeave.file = {
                        type: 'pdf',
                        name: req.file.filename
                    }
                } else {
                    newLeave.file = {
                        type: 'img',
                        name: req.file.filename
                    }
                }
            }
            newLeave.save((err, leave) => {
                if (err) {
                    res.status(500).send({
                        added: false
                    });
                } else {
                    const notificationQuery = new notification();
                    notificationQuery.details.user_name = user.firstName + ' ' + user.lastName;
                    notificationQuery.details.days = days_count;
                    notificationQuery.link = leave._id;
                    notificationQuery.type = 'leave';
                    notificationQuery.save();
                    res.status(200).send({
                        added: true
                    });
                }
            });
        });
    });


}

exports.getArchivedLeaves = (req, res) => {
    //get leaves where status is not in progress
    Leave.find({
        status: {
            $ne: 'in progress'
        }
    }, (err, leaves) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(leaves);
        }
    }).populate('from', 'firstName lastName');

}

exports.getAllLeaves = (req, res) => {
    Leave.find({
        status: 'in progress'
    }, (err, leaves) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(leaves);
        }
    }).populate('from', 'firstName lastName');
}

exports.getLeavesById = (req, res) => {
    Leave.findById(req.params.id, (err, leave) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(leave);
        }
    }).populate('from', 'firstName lastName leaves_left');
}

exports.getLeavesByUserId = (req, res) => {
    Leave.find({
        from: req.params.id
    }, (err, leaves) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(leaves);
        }
    }).populate('from', 'firstName lastName leaves_left');
}

exports.updateStatus = (req, res) => {
    if (req.body.status == 'declined') {
        User.findOne({
            _id: req.body.user_id
        }, (err, user) => {
            pushNotificationController.SendNotificationToDevice({"device_id":user.device_id , "message" : "A Leave request has been declined. Please check the application for reasons."}, res);
            user.leaves_left = user.leaves_left + req.body.leaves_days_count;
            user.save((err, user) => {
                Leave.findOneAndUpdate({
                    _id: req.params.id
                }, {
                    status: req.body.status,
                    note: req.body.note
                }, (err, leave) => {
                    if (err) {
                        res.status(500).send({
                            message: err.message
                        });
                    } else {
                        res.status(200).send({
                            updated: true
                        });
                    }
                })
            });
        });
    } else {
        User.findOne({
            _id: req.body.user_id
        }, (err, user) => {
            pushNotificationController.SendNotificationToDevice({"device_id":user.device_id , "message" : "A Leave request has been accepted."}, res);
            PDFAdmin.acceptLeave(req);
            Leave.findOneAndUpdate({
                _id: req.params.id
            }, {
                status: req.body.status
            }, (err, leave) => {
                if (err) {
                    res.status(500).send({
                        message: err.message
                    });
                } else {
                    res.status(200).send({
                        updated: true
                    });
                }
            });
        });
    }

}


exports.resetDaysCount = () => {
    //check if this day is first of january then update all users leaves_left to 40
    let today = new Date();
    let firstOfJanuary = new Date(today.getFullYear(), 0, 1);
    if (today.getDate() == firstOfJanuary.getDate() && today.getMonth() == 0) {
        User.find({}, (err, users) => {
            users.forEach(user => {
                // if user type is employee then update his leaves_left to 40
                if (user.type == 'employee') {
                    user.leaves_left = 40;
                    user.save((err, user) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });
        });
    }


}