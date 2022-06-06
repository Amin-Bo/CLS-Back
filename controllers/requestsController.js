const PDFEmployee = require('../pdf/employee');
const mail = require ('../mail/mail');
const Request = require('../models/request');
const moment = require('moment');
const PDFAdmin = require('../pdf/adminValidation');
const notification = require('../models/notification');
const pushNotificationController = require('./push-notification.Controller');
const User = require('../models/users');


exports.addRequest = async (req, res, next)  => {
    user = req.user;
    query = new Request();
    query.from=user._id;
    query.done_date=null;
    query.type=req.body.type;
    query.sent_date = Date.now();
    var today = new Date();
    let unique_number = today.getTime();
    fileName = 'attestation'+'-'+unique_number+'-'+req.body._id+'.pdf';
    PDFEmployee.create(req,fileName);
    query.file=fileName;
    await query.save();
    req.body.query=query;
    mail.sendToAdmin(req);
    const notificationQuery = new notification();
    const fullName = req.body.firstName + ' ' + req.body.lastName;
    notificationQuery.details = {
        user_name : fullName
    }
    notificationQuery.type = 'document';
    notificationQuery.link = query._id;
    notificationQuery.save();
    res.json({ success: true, message: 'profile ', query})
}

exports.getMyRequests = (req, res, next) => {
    Request.find({from:req.params.id},(err,request)=>{
        if (err) return res.status(401).json({msg:" you dont have any request"})
        else res.status(200).json(request)
        //reverse order of request 
    }).sort({sent_date: -1})

}
exports.getRequest = (req, res, next) => {
    user = req.user;
    Request.find({from:user._id, type : req.params.type},(err,request)=>{
        if (err) return res.status(401).json({msg:" you dont have any request"})
        else res.status(200).json({request})
    })
}

exports.getAllRequests = (req, res, next) => {
    Request.find({status: 'in progress'}, (err, request)=>{
        if (err) return res.status(500)
        else res.status(200).json({request})
    }).populate('from')
}

exports.getArchivedRequests = (req, res, next) => {
    Request.find({status: {$ne: "in progress"}}, (err, request)=>{
        if (err) return res.status(500)
        else res.status(200).json(request)
    }).populate('from')
}

exports.getRequestById = (req, res, next) => {
    Request.find({_id:req.params.id}, (err, request)=>{
        if(err) return res.status(404).json({message: "Request not found"})
        else return res.status(200).json({request})
    }).populate('from')
}

exports.updateStatus = (req, res, next) => {
    PDFAdmin.create(req);
    User.findOne({_id:req.body.user_id}, (err, user)=>{
        pushNotificationController.SendNotificationToDevice({"device_id":user.device_id , "message" : "A document you requested is ready to be downloaded."}, res);
        Request.findOneAndUpdate({_id:req.body.id}, {status:req.body.status, done_date : moment(Date.now()).format('YYYY-MM-DD[T00:00:00.000Z]') }, (err, request)=>{
            if(err) return res.status(404).json({message: "Request not found"})
            else {
                mail.sendToEmployee(request.from);
               // console.log(request)
                return res.status(200).json({message : "Request updated" , file : req.body.file})
            }
        })
    });
}

exports.declineRequest = (req, res, next) => {
    Request.findOneAndUpdate({_id:req.body.id}, {status:"declined"}, (err, request)=>{
        if(err) return res.status(404).json({message: "Request not found"})
        else {
            pushNotificationController.SendNotificationToDevice({"device_id":user.device_id , "message" : "A document you requested has been declined."}, res);
            mail.sendToEmployee(request.from);
            return res.status(200).json({message : "Request updated"})
        }
    })
}

exports.preview = (req, res, next) => {
    PDFAdmin.create(req);
    return res.status(200).json(req.body.file)
}


exports.getRequestsInProgress = (req, res, next) => {
    //get count of request in progress
    Request.countDocuments({status: "in progress"}, (err, count)=>{
        if(err) return res.status(404).json({message: "Request not found"})
        else return res.status(200).json({count})
    })
}