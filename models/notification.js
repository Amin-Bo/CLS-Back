const mongoose = require('mongoose');
const moment = require('moment');

let isLeave , isDocument,isContract = false
let today = moment(Date.now());

const NotificationSchema = new mongoose.Schema({
    details: {
        user_name : {type : String , required:isLeave && isDocument},
        days : {type:Number,required:isLeave},
        supplier_name : {type:String,required:isContract},
    },
    type :{type:String,enum:["leave","document","contract"],required:true},
    date :{type:Date,required:true,default:today},
    link :{type:String,required:true},
    seen :{type:Boolean,required:true, default:false},
});
NotificationSchema.pre('save', function(next) {
    switch (this.type) {
        case "leave":
            isLeave = true;
            break;
        case "document":
            isDocument = true;
            break;
        case "contract":
            isContract = true;
            break;
        default:
            break;
    }
    next();
})
module.exports = mongoose.model('Notification', NotificationSchema);