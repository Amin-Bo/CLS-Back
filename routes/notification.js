const moment = require("moment");
const Contract = require("../models/contract");
const mail  = require("../mail/mail");
function notify() {
  let currentDate = new Date();
  Contract.find({}, (err, contracts) => {
    // console.log(contracts.length);
    for (let contract of contracts){
      let ContractExpires_at = moment(contract["expires_at"]).format("YYYY-MM-DD");
      if (new Date(ContractExpires_at).getFullYear()-currentDate.getFullYear() == 0)
      {
        if(new Date(ContractExpires_at).getMonth()-currentDate.getMonth()<=2){
          console.log("email sent!!");
          mail.sendNotif(contract);
          
        }
      }
    }
  }).populate("supplier");
}
module.exports = notify;
