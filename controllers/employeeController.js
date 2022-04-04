const User = require('../models/users');

exports.getEmployees = (req, res, next) => {
    User.find({type: 'employee'}, (err, employee)=>{
        if (err) return res.status(401).json({msg:'no employees yet'})
        else return res.status(200).json({employee})
    })
}

exports.getEmployeeById = (req, res, next) => {
    User.findById(req.params.id, (err, employee)=>{
        if (err) return res.status(401).json({msg:'no employee found'})
        else return res.status(200).json(employee)
    })
}

exports.updateEmployeeProfile = (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, employee)=>{
        if (err) return res.status(401).json({update : false})
        else return res.status(200).json({updated : true})
    })
}