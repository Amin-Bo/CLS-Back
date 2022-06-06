const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let paid,not_paid,paid_by_split = false;
const ContractSchema = new mongoose.Schema({
    supplier: {type : Schema.Types.ObjectId, required: false,ref:"Supplier"},
    date_signature: {type : String,required: true},
    expires_at: {type : String,required: true},
    payment_status:{type : String},
    contract_details:{
        payment_date:{type : String,required:paid},
        payment_amount:{type : String,required:paid},
        method:{type : String, required:paid && paid_by_split},
        payment_amount:{type : String,required:paid && not_paid},
        due_date:{type : String,required:not_paid},
        global_amount:{type : String,required:paid_by_split},
        number_of_slices:{type : String,required:paid_by_split},
        payment_each_slice:{type : String,required:paid_by_split},
    },
    file: { type: String}
});
ContractSchema.pre('save',function preSave(next){
    switch (this.payment_status) {
        case "paid":
            paid=true;
            not_paid,paid_by_split!=paid
            break;
        case "not_paid":
            not_paid=true;
            paid,paid_by_split!=not_paid
            break;
        case "paid_by_split":
            paid_by_split=true;
            paid,not_paid!=paid_by_split
            break;
        default:
            break;
    }
    console.log(this)
    next();
})
module.exports = mongoose.model('Contract', ContractSchema);