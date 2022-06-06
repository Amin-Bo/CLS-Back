const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
var passport = require('passport')
require('dotenv').config();

const employeeRouter = require('./routes/employee');
const requestRouter = require('./routes/Request');
const supplierRouter = require('./routes/supplier');
const contractRouter = require('./routes/contract');
const invoiceRouter = require('./routes/invoice');
const leaveRouter = require('./routes/leave');
const statsRouter = require('./routes/stats');
const notifsRouter = require('./routes/notifs');
//connecting to database
// mongoose.connect('mongodb+srv://root:root@cluster0.xe2ma.mongodb.net/CLS-RH', {
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected successfully to MongoDB !'))
  .catch(() => console.log('Connection failed to MongoDB !'));

app.use(bodyParser.json());




// CORS Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, '/')));
app.use(passport.initialize());
//app.use(passport.session());
require('./config/passport')(passport)
app.use('/api/employee', employeeRouter);
app.use('/api/request',requestRouter);
app.use('/api/supplier',supplierRouter);
app.use('/api/contract',contractRouter);
app.use('/api/invoice',invoiceRouter);
app.use('/api/leave',leaveRouter);
app.use('/api/stats',statsRouter);
app.use('/api/notifications',notifsRouter);

module.exports = app;