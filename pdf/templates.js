const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const leave = require('../models/leave');

exports.workTemplate = (firstName,lastName,cin,date_in,date_out,job_title,department,pdfFile,type) => {
    var today = new Date();
    var todayFormat = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    logoPath = path.join(__dirname,'../assets/cls.jfif');
    signature = path.join(__dirname,'../assets/signature.jpg');
    var title;
    var writeType;
    if (type == "work"){
      var writeType = "a été salarié (e)";
      var title = "ATTESTATION DE TRAVAIL";
    } else if (type == "internship"){
      var writeType ="a effectué un stage";
      var title = "ATTESTATION DE STAGE";
    }
    
    var doc = new PDFDocument();
    var pdfStream = fs.createWriteStream(pdfFile);
  
        doc.fontSize(25).text(title, 150, 80);
          
        doc.image(logoPath,  70, 50, {width: 70});
            
        doc
          .text('', 50, 200)
          .font('Times-Roman', 20)
          .moveDown()
          .text('Je sousigné Mr. flen el fouleni Gérant de la société CLS,atteste/attestons par la présente que Mr '+lastName +' '+ firstName+' titulaire de la CIN N°'+cin+', '+writeType+' au sein de notre société du '+ date_in +' au '+ date_out +' occupé le post de '+ job_title +' au department '+ department +'.Cette attestation est délivrée à l’intéressé (e) pour servir et valoir ce que de droit.', {
            width: 500,
            align: 'justify',
            indent: 50,
            columns: 1,
            height: 700,
            ellipsis: true,
            lineGap : 10
          }).moveDown()
          .moveDown()
          .moveDown()
          .text('Fait à Tunis le '+todayFormat)
          .moveDown()
          .text('Prénom et nom de l’intermédiaire')
          .text('Signature et cachet');
          doc.image(signature,240,600,{width : 400});
        doc.pipe(pdfStream);
        doc.pipe(fs.createWriteStream(pdfFile));
  
        doc.end();
}

exports.leaveTemplate = (firstName,lastName,cin,job_title,department,days_count,start,end,leave_id) =>{
  var today = new Date();
  let unique_number = today.getTime();
  fileName = 'congé'+'-'+unique_number+'.pdf';
  saveToPath = "../assets/leaves/accepted/";
  var pdfFile = path.join(__dirname, saveToPath+fileName);
  var todayFormat = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
  logoPath = path.join(__dirname,'../assets/cls.jfif');
  signature = path.join(__dirname,'../assets/signature.jpg');
  leave.findById(leave_id,(err,leave)=>{
    //update certificate with fileName
    leave.certificate = fileName;
    leave.save();
  })
  
        var doc = new PDFDocument();
        var pdfStream = fs.createWriteStream(pdfFile);

        // draw some text
        doc.fontSize(25).text('Attestation de congé', 180, 80);
        doc.image(logoPath,  70, 50, {width: 70});
        doc.text('',50,200)
        .font('Times-Roman',20)
        .moveDown()
        .text('Nous soussigné, société CLS, attestons que :')
        .moveDown()
        .font('Times-Bold')
        .text('Mr(Mme) '+firstName+" "+lastName,180)
        .moveDown()
        .font('Times-Roman',20)
        .text("",50)
        .text("Titulaire de CIN n° "+cin+" Occupé la poste de "+job_title+" au departement "+department+", pourra bénéficier d'un congé d'une duré de "+days_count+" jour(s) et ce à partir du "+start+" jusqua'a "+end+".",{lineGap:8})
        .moveDown()
        .text("Cette attestation lui est delivrée pour servire et valoir ce que de droit")
        .moveDown()
        .moveDown()
        .moveDown()
        .text('Fait à Tunis le '+todayFormat)
        .moveDown()
        .text('Prénom et nom de l’intermédiaire')
        .text('Signature et cachet');
        doc.image(signature,240,600,{width : 400});
        doc.pipe(pdfStream);
        doc.pipe(fs.createWriteStream(pdfFile));
        // end and display the document in the iframe to the right
        doc.end();
}