var dotenv = require('dotenv');
var env = process.env.NODE_ENV;
var envFile = env === 'development' ? `.${env}` : '';
dotenv.config({ path: `.env${envFile}` });

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const paginate = require('express-paginate');
require('express-group-routes');

//router list
var indexRouter = require('./routes/index');
var customersRouter = require('./routes/customers');
var transactionsRouter = require('./routes/transactions');
var vouchersRouter = require('./routes/vouchers');
var campaignsRouter = require('./routes/campaigns');
var attachmentsRouter = require('./routes/attachments');
var campaignAttachmentsRouter = require('./routes/campaignAttachments');


var app = express();
app.use(paginate.middleware(10, 50));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.group('/v1',(version) =>{
  version.use('/customers', customersRouter);
  version.use('/transactions', transactionsRouter);
  version.use('/vouchers', vouchersRouter);
  version.use('/campaigns', campaignsRouter);
  version.use('/attachments', attachmentsRouter);
  version.use('/campaign-attachments', campaignAttachmentsRouter);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let notFound = {
      "status":404,
      "message" :"The URL not found"
  }
  next(res.status(404).json(notFound));
  
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// custom port
const port = 3000
app.listen(port, () => {
  //console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;
