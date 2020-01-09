var express = require('express');
var router = express.Router();

const type = "clase"

router.get('/', function (req, res, next) {
  const db = require('../database/config')
  db.query(`SELECT * from ${type}`, (err, rows, fields) => {
    if (err) throw err;
    res.render(type, { type: rows });
  })
});

router.post('/crearClase', function (req, res, next) {
  const db = require('../database/config');
  let clase = { clase: req.body.clase } 
  db.query(`INSERT INTO ${type} SET ?`, clase, function (err, rows, fields) {
    if (err) throw err;    
    res.redirect("/" + type);    
  });
});

router.post('/actualizarClase', function (req, res, next) {
  const db = require('../database/config');
  let obj = {
    id_clase: req.body.id_clase,
    clase: req.body.clase
  };
  db.query(`UPDATE ${type} SET ? WHERE ?`, [obj, { id_clase: req.body.id_clase }], (err, rows, fields) => {
    if (err) throw err;
    res.redirect("/" + type);
  });
});

router.post('/eliminarClase', function (req, res, next) {
  const db = require('../database/config');
  let id = req.body.id_clase;
  db.query(`DELETE FROM ${type} WHERE id_${type} = ?`, id, function (err, rows, fields) {
    if (err) throw err;    
    res.redirect("/" + type);    
  });
});


module.exports = router;
