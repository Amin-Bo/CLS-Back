const moment = require("moment");
const mail  = require("../mail/mail");
function notifyMe( reqData) {
  let currentDate = new Date();

  mail.flutterNotification(reqData);
}
module.exports = notifyMe;
