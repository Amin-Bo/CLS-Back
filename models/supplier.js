const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SupplierSchema = new mongoose.Schema({
    name: {type : String, required: true},
    email: {type : String, required: true},
    phone: {type : String, required: true},
    address: {type : String, required: true},
    contract_start_date: {type : String, required: true},
    contract_end_date: {type : String, required: true},
});

module.exports = mongoose.model('Supplier', SupplierSchema);