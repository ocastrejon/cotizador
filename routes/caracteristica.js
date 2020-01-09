var express = require('express');
var router = express.Router();

const type = "caracteristica"

router.get('/', function (req, res, next) {
  const db = require('../database/config')
  let id_producto = req.query.id_producto
  let id_proyecto = req.query.id_proyecto
  db.query(`SELECT * from ${type} WHERE id_producto = ? `, id_producto, (err, rows, fields) => {
    if (err) throw err;
    res.render(type, { id_producto: id_producto, id_proyecto: id_proyecto, type: rows });
  })
});

router.post('/crearCaracteristica', function (req, res, next) {
  const db = require('../database/config');
  let caracteristica = { 
    caracteristica: req.body.caracteristica,
    id_producto: req.body.id_producto,
    id_proyecto: req.body.id_proyecto
  } 
  db.query(`INSERT INTO ${type} SET ?`, caracteristica, function (err, rows, fields) {
    if (err) throw err;    
    res.redirect("/" + type + "?id_producto=" + caracteristica.id_producto + "&id_proyecto=" + caracteristica.id_proyecto);    
  });
});

router.post('/actualizarCaracteristica', function (req, res, next) {
  const db = require('../database/config');
  let obj = {
    id_caracteristica: req.body.id_caracteristica,
    id_producto: req.body.id_producto,
    id_proyecto: req.body.id_proyecto,
    caracteristica: req.body.caracteristica
  };
  db.query(`UPDATE ${type} SET ? WHERE ?`, [obj, { id_caracteristica: req.body.id_caracteristica }], (err, rows, fields) => {
    if (err) throw err;
    res.redirect("/" + type + "?id_producto=" + obj.id_producto + "&id_proyecto=" + obj.id_proyecto);
  });
});

router.post('/eliminarCaracteristica', function (req, res, next) {
  const db = require('../database/config');
  let id = req.body.id_caracteristica;
  let id_producto = req.body.id_producto;
  let id_proyecto = req.body.id_proyecto;
  db.query(`DELETE FROM ${type} WHERE id_${type} = ?`, id, function (err, rows, fields) {
    if (err) throw err;    
    res.redirect("/" + type + "?id_producto=" + id_producto + "&id_proyecto=" + id_proyecto);    
  });
});


module.exports = router;
