var express = require('express');
var router = express.Router();

const type = "categoria"

router.get('/', function (req, res, next) {
  const db = require('../database/config')
  db.query(`SELECT * from ${type}`, (err, rows, fields) => {
    if (err) throw err;
    res.render(type, { type: rows });
  })
});

router.post('/crearCategoria', function (req, res, next) {
  const db = require('../database/config');
  let categoria = { categoria: req.body.categoria } 
  db.query(`INSERT INTO ${type} SET ?`, categoria, function (err, rows, fields) {
    if (err) throw err;    
    res.redirect("/" + type);    
  });
});

router.post('/actualizarCategoria', function (req, res, next) {
  const db = require('../database/config');
  let obj = {
    id_categoria: req.body.id_categoria,
    categoria: req.body.categoria
  };
  db.query(`UPDATE ${type} SET ? WHERE ?`, [obj, { id_categoria: req.body.id_categoria }], (err, rows, fields) => {
    if (err) throw err;
    res.redirect("/" + type);
  });
});

router.post('/eliminarCategoria', function (req, res, next) {
  const db = require('../database/config');
  let id = req.body.id_categoria;
  db.query(`DELETE FROM ${type} WHERE id_${type} = ?`, id, function (err, rows, fields) {
    if (err) throw err;    
    res.redirect("/" + type);    
  });
});


module.exports = router;
