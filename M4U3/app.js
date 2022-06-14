var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

var pool = require('./models/bd'); //bd.js

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const PoolCluster = require('mysql/lib/PoolCluster');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//select
//Pool.query("select * from empleados").then(function(resultados){// console.log(resultados)//});

//insert
//var obj={
 // nombre: 'carlos',
 // apellido: 'lopez',
 // trabajo: 'programador',
 // edad: 38,
  //salario: 150000,
  //mail: 'carloslopez@gmail.com'
//}
//pool.query('insert into empleados set ?', [obj]).then(function(resultados){
 // console.log(resultados)
//});

//modificar
//var id= 23;
//var obj= {
//  nombre: 'pablo',
//  apellido: 'gomez'
//}
//pool.query('update empleados set ? where id_emp=?',[obj,id]).then(function (resultados) {
 // console.log(resultados);
//});

//var id = 23;
//pool.query('delete from empleados where id_emp=?',[id]).then(function(resultados) {
 // console.log(resultados);
//});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
