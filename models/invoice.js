const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const InvoiceSchema = new mongoose.Schema({
    supplier: {type : Schema.Types.ObjectId, required: false,ref:"Supplier"},
    date: {type : String,required: true},
    payment_method:{type : String,required: true},
    payment_status:{type : String,required: true},
    amount:{type : Number,required: true},
    amount_excluding_taxes:{type : Number,required: true},
    file: { type: String}
});

module.exports = mongoose.model('Invoice', InvoiceSchema);