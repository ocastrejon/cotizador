var express = require('express');
var router = express.Router();
const fs = require('fs');

const type = "producto"

router.get('/', function (req, res, next) {
  const db = require('../database/config')
  let id = req.query.id_proyecto
  db.query(`SELECT * from ${type} WHERE id_proyecto = ? `, id, (err, rows, fields) => {
    fs.readdir("./public/imagenes/", function (err, archivos) {
      if (err) throw err;
      res.render(type, { id: id, type: rows, archivos: archivos });
    })
  })
});

router.post('/crearProducto', function (req, res, next) {
  const db = require('../database/config');
  let producto = { 
      producto: req.body.producto,
      imagen: req.body.imagen,
      cantidad: req.body.cantidad,
      id_proyecto: req.body.id_proyecto
  } 
  db.query(`INSERT INTO ${type} SET ?`, producto, function (err, rows, fields) {
    if (err) throw err;    
    res.redirect("/" + type + "?id_proyecto=" + producto.id_proyecto);    
  });
});

router.post('/actualizarProducto', function (req, res, next) {
  const db = require('../database/config');
  let obj = {
    id_producto: req.body.id_producto,
    imagen: req.body.imagen,
    cantidad: req.body.cantidad,
    producto: req.body.producto
  };
  let id_proyecto = req.body.id_proyecto
  db.query(`UPDATE ${type} SET ? WHERE ?`, [obj, { id_producto: req.body.id_producto }], (err, rows, fields) => {
    if (err) throw err;
    res.redirect("/" + type + "?id_proyecto=" + id_proyecto);
  });
});

router.post('/eliminarProducto', function (req, res, next) {
  const db = require('../database/config');
  let id = req.body.id_producto;
  let id_proyecto = req.body.id_proyecto
  db.query(`DELETE FROM ${type} WHERE id_${type} = ?`, id, function (err, rows, fields) {
    // if (err) throw err;    
    res.redirect("/" + type + "?id_proyecto=" + id_proyecto);    
  });
});


module.exports = router;
