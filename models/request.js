const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
const RequestSchema = new mongoose.Schema({
    from: {type : Schema.Types.ObjectId, required: false,ref:"User"},
    sent_date: {type : Date, required: false},
    done_date: {type : String, required: false },
    type: {type : String,enum: ["work", "internship"], required: true},
    status: {type :String ,enum: ["in progress", "done", "declined"], required: true , default: 'in progress'},
    file : {type : String, required: false},

});

module.exports = mongoose.model('Request', RequestSchema);