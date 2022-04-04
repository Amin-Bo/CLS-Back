const moment = require('moment');
const path = require('path');
const pdfTemplates = require('./templates');

exports.create = (req, fileName, res) =>{
    firstName = req.body.firstName || '##First Name##';
    lastName = req.body.lastName || '##Last Name##';
    cin = req.body.cin || '##CIN##';
    date_in = moment(req.body.date_in).format('DD/MM/YYYY') || '##Date In##';
    date_out = req.body.date_out == "Present" ? "Present" : moment(req.body.date_out).format('DD/MM/YYYY');
    job_title = req.body.job_title || '##Job Title##';
    department = req.body.department || '##Department##';
    
    saveToPath = "../assets/certifications/";
    //delete file if exist
    try{
        var pdfFile = path.join(__dirname, saveToPath+fileName);
          pdfTemplates.workTemplate(firstName,lastName,cin,date_in,date_out,job_title,department,pdfFile,req.body.type);
      }catch(err){
        console.error('MakePDF ERROR: ' + err.message);
      }
}
