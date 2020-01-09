var express = require('express');
var router = express.Router();

const type = "medida"

router.get('/', function (req, res, next) {
  const db = require('../database/config')
  db.query(`SELECT * from ${type}`, (err, rows, fields) => {
    if (err) throw err;
    res.render(type, { type: rows });
  })
});

router.post('/crearMedida', function (req, res, next) {
  const db = require('../database/config');
  let medida = { 
      largo: req.body.largo, 
      ancho: req.body.ancho, 
      grosor: req.body.grosor
  } 
  db.query(`INSERT INTO ${type} SET ?`, medida, function (err, rows, fields) {
    if (err) throw err;    
    res.redirect("/" + type);    
  });
});

router.post('/actualizarMedida', function (req, res, next) {
  const db = require('../database/config');
  let obj = {
    id_medida: req.body.id_medida,
    largo: req.body.largo, 
    ancho: req.body.ancho, 
    grosor: req.body.grosor
  };
  db.query(`UPDATE ${type} SET ? WHERE ?`, [obj, { id_medida: req.body.id_medida }], (err, rows, fields) => {
    if (err) throw err;
    res.redirect("/" + type);
  });
});

router.post('/eliminarMedida', function (req, res, next) {
  const db = require('../database/config');
  let id = req.body.id_medida;
  db.query(`DELETE FROM ${type} WHERE id_${type} = ?`, id, function (err, rows, fields) {
    if (err) throw err;    
    res.redirect("/" + type);    
  });
});


module.exports = router;
