const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeaveSchema = new mongoose.Schema({
    from: {type : Schema.Types.ObjectId, required: false,ref:"User"},
    sent_date: {type : String, required: false},
    leave_start_date: {type : String, required: false},
    leave_end_date: {type : String, required: false},
    leave_days: {type : Number, required: false},
    type: {type : String,enum: ["Sick", "Casual","Maternity","Paternity","Bereavement","Compensatory"], required: false},
    status: {type :String , required: false , default: 'in progress'},
    file : {
        required: false,
        type : {type: String , enum: ["pdf","img"]},
        name : {type: String},
    },
    note: {type : String, required: false},
    certificate : {type : String, required: false},

});

module.exports = mongoose.model('Leave', LeaveSchema);