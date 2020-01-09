var express = require('express');
var router = express.Router();

const type = "tamanio"

router.get('/', function (req, res, next) {
  const db = require('../database/config')
  db.query(`SELECT * from ${type}`, (err, rows, fields) => {
    if (err) throw err;
    res.render(type, { type: rows });
  })
});

router.post('/crearTamanio', function (req, res, next) {
  const db = require('../database/config');
  let tamanio = { tamanio: req.body.tamanio } 
  db.query(`INSERT INTO ${type} SET ?`, tamanio, function (err, rows, fields) {
    if (err) throw err;    
    res.redirect("/" + type);    
  });
});

router.post('/actualizarTamanio', function (req, res, next) {
  const db = require('../database/config');
  let obj = {
    id_tamanio: req.body.id_tamanio,
    tamanio: req.body.tamanio
  };
  db.query(`UPDATE ${type} SET ? WHERE ?`, [obj, { id_tamanio: req.body.id_tamanio }], (err, rows, fields) => {
    if (err) throw err;
    res.redirect("/" + type);
  });
});

router.post('/eliminarTamanio', function (req, res, next) {
  const db = require('../database/config');
  let id = req.body.id_tamanio;
  db.query(`DELETE FROM ${type} WHERE id_${type} = ?`, id, function (err, rows, fields) {
    if (err) throw err;    
    res.redirect("/" + type);    
  });
});


module.exports = router;
