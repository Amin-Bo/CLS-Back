const Leave = require('../models/leave');
const User = require('../models/users');
const contract = require('../models/contract');
const invoice = require('../models/invoice');
const request = require('../models/request');
const supplier = require('../models/supplier');

exports.getStats = (req, res) => {
    //get documents count
    User.countDocuments({}, (err, userCount) => {
        userCount = userCount-1;
            contract.countDocuments({}, (err, contractCount) => {
                invoice.countDocuments({}, (err, invoiceCount) => {
                    request.countDocuments({}, (err, requestCount) => {
                        supplier.countDocuments({}, (err, supplierCount) => {
                            res.status(200).json({
                                USERS : userCount,
                                CONTRACTS : contractCount,
                                INVOICES : invoiceCount,
                                REQUESTS : requestCount,
                                SUPPLIERS : supplierCount
                            })
                        })
                    })
                })
            })
    })
}

exports.getRequestsStats = (req, res) => {
    //get leaves count 
    Leave.countDocuments({}, (err, leaveCount) => {
        //get requests where type is work count
        request.countDocuments({type: 'work'}, (err, workCount) => {
            //get requests where type is internship count
            request.countDocuments({type: 'internship'}, (err, internshipCount) => {
                res.status(200).json({
                    LEAVES : leaveCount,
                    WORK : workCount,
                    INTERNSHIP : internshipCount
                })
            });
        });
    });
}

exports.getGenderStats = (req, res) => {
    // get users count where gender is male
    User.countDocuments({gender : 'male'}, (err,maleCount)=>{
        User.countDocuments({gender: 'female'},(err,femaleCount)=>{
            res.status(200).json({
                male: maleCount,
                female : femaleCount
            })
        })
    })
}