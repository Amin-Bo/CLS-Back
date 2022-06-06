const path = require("path");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const User = require("../models/users");
exports.sendToAdmin = (req, res, next) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "cls.rh.2022@gmail.com",
      pass: "xfhedkatasyxpmvg",
    },
  });

  //current folder path

  const handlebarOptions = {
    viewEngine: {
      extName: ".hbs",
      partialsDir: path.resolve("./mail/views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./mail/views"),
    extName: ".hbs",
  };
  transporter.use("compile", hbs(handlebarOptions));

  let mailOptions = {
    from: "cls.rh.2022@gmail.com",
    to: "aminos.bo.12@gmail.com",
    subject: "New Document Request",
    template: "index",
    context: {
      name: req.body.firstName + " " + req.body.lastName,
      url:"http://localhost:4200/admin/requests/"+req.body.query._id
    },
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return console.log("Error occurs : " + err);
    }
    return console.log("Email sent!!!");
  });
};
exports.sendToEmployee = (req, res, next) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "cls.rh.2022@gmail.com",
      pass: "xfhedkatasyxpmvg",
    },
  });
  // get Request Sender
  User.findOne({ _id: req }, (err, user) => {
    if (!user) return console.log(err);
    else {
        const handlebarOptions = {
            viewEngine: {
              extName: ".hbs",
              partialsDir: path.resolve("./mail/views"),
              defaultLayout: false,
            },
            viewPath: path.resolve("./mail/views"),
            extName: ".hbs",
          };
          transporter.use("compile", hbs(handlebarOptions));
        
          let mailOptions = {
            from: "cls.rh.2022@gmail.com", 
            to: user.email, 
            subject: "Your Request's status has been updated",
            template: "employee",
            context: {
              name: user.firstName + " " +user.lastName,
            },
          };
        
          transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
              return console.log("Error occurs : " + err);
            }
            return console.log("Email sent!!!");
          });
    }
  });
  //current folder path
};

exports.sendAfterRegister = (req, res, next) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "cls.rh.2022@gmail.com",
      pass: "xfhedkatasyxpmvg",
    },
  });
  const handlebarOptions = {
    viewEngine: {
      extName: ".hbs",
      partialsDir: path.resolve("./mail/views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./mail/views"),
    extName: ".hbs",
  };
  transporter.use("compile", hbs(handlebarOptions));

  let mailOptions = {
    from: "cls.rh.2022@gmail.com", //email sender
    to: req.body.email, //email receiver
    subject: "Welcome To CLS-RH",
    template: "afterRegister",
    context: {
      name: req.body.firstName + " " +req.body.lastName,
      password : req.body.password
    },
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return console.log("Error occurs : " + err);
    }
    return console.log("Email sent!!!");
  });
}
exports.sendNotif= (req, res, next) => {

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "cls.rh.2022@gmail.com",
      pass: "xfhedkatasyxpmvg",
    },
  });
  const handlebarOptions = {
    viewEngine: {
      extName: ".hbs",
      partialsDir: path.resolve("./mail/views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./mail/views"),
    extName: ".hbs",
  };
  transporter.use("compile", hbs(handlebarOptions));
  let mailOptions = {
    from: "cls.rh.2022@gmail.com", //email sender
    to: "cls.rh.2022@gmail.com", //email receiver
    subject: "Welcome To CLS-RH",
    template: "contract",
    context: {
      name: req.supplier.name,
      url :"http://localhost:4200/admin/contracts/"+req._id
    },
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return console.log("Error occurs : " + err);
    }
    return console.log("Email sent!!!");
  });
}