var express = require('express');
var router = express.Router();

const type = "proyecto"

router.get('/', function (req, res, next) {
  const db = require('../database/config')
  db.query(`SELECT * from ${type}`, (err, rows, fields) => {
    if (err) throw err;
    res.render(type, { type: rows });
  })
    // res.render(type);
});

router.post('/crearProyecto', function (req, res, next) {
  const db = require('../database/config');
  let proyecto = {
      nombre_proyecto : req.body.nombre_proyecto,
      prefijo_interesado : req.body.prefijo_interesado,
      nombre_interesado : req.body.nombre_interesado,
      apellido_interesado : req.body.apellido_interesado,
      empresa_interesado : req.body.empresa_interesado
  } 
  db.query(`INSERT INTO ${type} SET ?`, proyecto, function (err, rows, fields) {
    if (err) throw err;    
    res.redirect("/" + type);    
  });
});

// router.post('/actualizarProyecto', function (req, res, next) {
//   const db = require('../database/config');
//   let obj = {
//     id_proyecto: req.body.id_proyecto,
//     proyecto: req.body.proyecto
//   };
//   db.query(`UPDATE ${type} SET ? WHERE ?`, [obj, { id_proyecto: req.body.id_proyecto }], (err, rows, fields) => {
//     if (err) throw err;
//     res.redirect("/" + type);
//   });
// });

// router.post('/eliminarProyecto', function (req, res, next) {
//   const db = require('../database/config');
//   let id = req.body.id_proyecto;
//   db.query(`DELETE FROM ${type} WHERE id_${type} = ?`, id, function (err, rows, fields) {
//     if (err) throw err;    
//     res.redirect("/" + type);    
//   });
// });


module.exports = router;
