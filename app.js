var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fileUpload = require('express-fileupload')

var indexRouter = require('./routes/index');
var categoriasRouter = require('./routes/categoria');
var claseRouter = require('./routes/clase');
var medidaRouter = require('./routes/medida');
var proveedorRouter = require('./routes/proveedor');
var tamanioRouter = require('./routes/tamanio');
var materialRouter = require('./routes/material');
var proyectoRouter = require('./routes/proyecto');
var productoRouter = require('./routes/producto');
var elementoRouter = require('./routes/elemento');
var vistaPreviaRouter = require('./routes/vistaPrevia');
var imprimirRouter = require('./routes/imprimir');
var caracteristicaRouter = require('./routes/caracteristica');
var imagenRouter = require('./routes/imagen');

var app = express();

app.use(fileUpload())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/categoria', categoriasRouter);
app.use('/clase', claseRouter);
app.use('/medida', medidaRouter);
app.use('/proveedor', proveedorRouter);
app.use('/tamanio', tamanioRouter);
app.use('/material', materialRouter);
app.use('/proyecto', proyectoRouter);
app.use('/producto', productoRouter);
app.use('/elemento', elementoRouter);
app.use('/vistaPrevia', vistaPreviaRouter);
app.use('/imprimir', imprimirRouter);
app.use('/caracteristica', caracteristicaRouter);
app.use('/imagen', imagenRouter);

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

//  CODIGO HBS ----------------------------------------------------------------
const hbs = require('hbs');
const fs = require('fs');
const partialsDir = __dirname + '/views/partials';
const filenames = fs.readdirSync(partialsDir);
  filenames.forEach(function (filename) {
    const matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) {
      return;
    }
    const name = matches[1];
    const template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
    hbs.registerPartial(name, template);
  });
  hbs.registerHelper('json', function(context) {
      return JSON.stringify(context, null, 2);
  });
//  CODIGO HBS ----------------------------------------------------------------

module.exports = app;
