var express = require('express');
var router = express.Router();

const type = "material"

router.get('/', function (req, res, next) {
  const db = require('../database/config')
  db.query(`SELECT * from categoria`, (err, categoria, fields) => {
    if (err) throw err;
    db.query(`SELECT * from clase`, (err, clase, fields) => {
      if (err) throw err;
      db.query(`SELECT * from tamanio`, (err, tamanio, fields) => {
        if (err) throw err;
        db.query(`SELECT * from proveedor`, (err, proveedor, fields) => {
          if (err) throw err;
          db.query(`SELECT id_material, categoria, clase, medida, tamanio, proveedor, precio 
                    FROM material
                    INNER JOIN categoria USING (id_categoria) 
                    INNER JOIN clase USING (id_clase)
                    INNER JOIN tamanio USING (id_tamanio)
                    INNER JOIN proveedor USING (id_proveedor);`, (err, material, fields) => {
            if (err) throw err;
            res.render(type, { categoria: categoria, clase: clase, tamanio: tamanio, proveedor: proveedor, material: material });
          })
        })
      })
    })
  })
});

router.post('/crearMaterial', function (req, res, next) {
  const db = require('../database/config');
  let material = { 
    id_categoria: req.body.categoria, 
    id_clase: req.body.clase, 
    medida: req.body.medida,
    id_tamanio: req.body.tamanio,
    id_proveedor: req.body.proveedor, 
    precio: req.body.precio,
  } 
  db.query(`INSERT INTO ${type} SET ?`, material, function (err, rows, fields) {
    if (err) throw err;    
    res.redirect("/" + type);    
  });
});

router.post('/actualizarMaterial', function (req, res, next) {
  const db = require('../database/config');
  let obj = {
    id_material: req.body.id_material,
    nombre: req.body.nombre
  };
  db.query(`UPDATE ${type} SET ? WHERE ?`, [obj, { id_material: req.body.id_material }], (err, rows, fields) => {
    if (err) throw err;
    res.redirect("/" + type);
  });
});

router.post('/eliminarMaterial', function (req, res, next) {
  const db = require('../database/config');
  console.log(req.body)
  let id = req.body.id_material;
  db.query(`DELETE FROM ${type} WHERE id_${type} = ?`, id, function (err, rows, fields) {
    if (err) throw err;    
    res.redirect("/" + type);    
  });
});


module.exports = router;
