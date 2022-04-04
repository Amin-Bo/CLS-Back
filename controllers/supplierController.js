const Supplier = require('../models/supplier')
const moment = require('moment');

exports.getAllSuppliers = (req, res) => {
    Supplier.find({}, (err, suppliers)=>{
        if (err) return res.status(500)
        else res.status(200).json({suppliers})
    });
}

exports.getSupplierById = (req, res) => {
    Supplier.findById(req.params.id, (err, supplier)=>{
        if (err) return res.status(404)
        else res.status(200).json({supplier})
    });
}

exports.updateSupplier = (req, res) => {
    Supplier.findByIdAndUpdate(req.params.id, req.body, (err, supplier)=>{
        if (err) return res.status(404)
        else res.status(200).json({message : "Supplier updated"})
    });
}

exports.addSupplier = (req, res) => {
    let query = new Supplier();
    query.name=req.body.name;
    query.email=req.body.email;
    query.phone=req.body.phone;
    query.address=req.body.address;
    query.contract_start_date=moment(req.body.contract_start_date).format('YYYY-MM-DD[T00:00:00.000Z]');
    query.contract_end_date=moment(req.body.contract_end_date).format('YYYY-MM-DD[T00:00:00.000Z]');
    query.save();
    res.status(200).json({ success: true, query})
}

exports.deleteSupplier = (req, res) => {
    Supplier.findByIdAndRemove(req.params.id, (err, supplier)=>{
        if (err) return res.status(404)
        else res.status(200).json({message : "Supplier deleted"})
    });
}