var express = require('express');
var router = express.Router();

const type = "proveedor"

router.get('/', function (req, res, next) {
  const db = require('../database/config')
  db.query(`SELECT * from ${type}`, (err, rows, fields) => {
    if (err) throw err;
    res.render(type, { type: rows });
  })
});

router.post('/crearProveedor', function (req, res, next) {
  const db = require('../database/config');
  let proveedor = { proveedor: req.body.proveedor } 
  db.query(`INSERT INTO ${type} SET ?`, proveedor, function (err, rows, fields) {
    if (err) throw err;    
    res.redirect("/" + type);    
  });
});

router.post('/actualizarProveedor', function (req, res, next) {
  const db = require('../database/config');
  let obj = {
    id_proveedor: req.body.id_proveedor,
    proveedor: req.body.proveedor
  };
  db.query(`UPDATE ${type} SET ? WHERE ?`, [obj, { id_proveedor: req.body.id_proveedor }], (err, rows, fields) => {
    if (err) throw err;
    res.redirect("/" + type);
  });
});

router.post('/eliminarProveedor', function (req, res, next) {
  const db = require('../database/config');
  let id = req.body.id_proveedor;
  db.query(`DELETE FROM ${type} WHERE id_${type} = ?`, id, function (err, rows, fields) {
    if (err) throw err;    
    res.redirect("/" + type);    
  });
});


module.exports = router;
