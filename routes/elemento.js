var express = require('express');
var router = express.Router();

const type = "elemento"

router.get('/', function (req, res, next) {
  const db = require('../database/config')
  let id_proyecto = req.query.id_proyecto
  let id_producto = req.query.id_producto
  db.query(`SELECT id_material, categoria, clase, medida, tamanio, proveedor, precio 
            FROM material
            INNER JOIN categoria USING (id_categoria) 
            INNER JOIN clase USING (id_clase)
            INNER JOIN tamanio USING (id_tamanio)
            INNER JOIN proveedor USING (id_proveedor);`, (err, material, fields) => {
    if (err) throw err;
    db.query(`SELECT * from medida`, (err, medida, fields) => {
      if (err) throw err;
      db.query(`SELECT 	id_elemento, id_producto, id_proyecto, 
                        categoria, clase, medida, tamanio, 
                        proveedor, precio, cantidad, importe, 
                        largo, ancho, grosor, pies
                  FROM elemento
                  INNER JOIN medida USING (id_medida)
                  INNER JOIN material USING (id_material)
                  INNER JOIN categoria USING (id_categoria) 
                  INNER JOIN clase USING (id_clase)
                  INNER JOIN tamanio USING (id_tamanio)
                  INNER JOIN proveedor USING (id_proveedor)
                  WHERE id_producto = ?`, id_producto, (err, elemento, fields) => {
        if (err) throw err;
        db.query(`SELECT * from extra WHERE id_producto = ? `, id_producto, (err, extra, fields) => {
          if (err) throw err;
          res.render(type, { id_proyecto: id_proyecto, id_producto: id_producto, material: material, medida: medida, elemento: elemento, extra: extra });
        })
      })
    })
  })
});

router.post('/crearElemento', function (req, res, next) {
  const db = require('../database/config');
  let medida = req.body.id_medida.split("-")[1].split(",") 
  let precioMedida = (medida[0]*medida[1]*medida[2])/12
  let precioPies = precioMedida*req.body.id_material.split("-")[1]
  let importe = precioPies*req.body.cantidad
  let elemento = {
    id_proyecto: req.body.id_proyecto,
    id_producto: req.body.id_producto,
    id_material: req.body.id_material.split("-")[0],
    cantidad: req.body.cantidad,
    pies: (precioMedida*req.body.cantidad).toFixed(2),
    importe: importe,
    id_medida: req.body.id_medida.split("-")[0]
  }
  db.query(`INSERT INTO ${type} SET ?`, elemento, function (err, rows, fields) {
    if (err) throw err;
    res.redirect("/" + type + "?id_proyecto=" + elemento.id_proyecto + "&id_producto=" + elemento.id_producto);
  });
});

router.post('/crearExtra', function (req, res, next) {
  const db = require('../database/config');
  let extra = {
    id_producto: req.body.id_producto,
    id_proyecto: req.body.id_proyecto,
    extra: req.body.extra,
    importe: req.body.importe
  }
  db.query(`INSERT INTO extra SET ?`, extra, function (err, rows, fields) {
    if (err) throw err;
    res.redirect("/" + type + "?id_proyecto=" + req.body.id_proyecto + "&id_producto=" + extra.id_producto);
  });
});

router.post('/actualizarExtra', function (req, res, next) {
  const db = require('../database/config');
  let obj = {
    id_extra: req.body.id_extra,
    id_producto: req.body.id_producto,
    id_proyecto: req.body.id_proyecto,
    extra: req.body.extra,
    importe: req.body.importe
  };
  let id_proyecto = req.body.id_proyecto
  db.query(`UPDATE extra SET ? WHERE ?`, [obj, { id_extra: req.body.id_extra }], (err, rows, fields) => {
    if (err) throw err;
    res.redirect("/" + type + "?id_proyecto=" + id_proyecto + "&id_producto=" + obj.id_producto);
  });
});

router.post('/eliminarExtra', function (req, res, next) {
  const db = require('../database/config');
  let id = req.body.id_extra;
  let id_proyecto = req.body.id_proyecto
  let id_producto = req.body.id_producto
  db.query(`DELETE FROM extra WHERE id_extra = ?`, id, function (err, rows, fields) {
    if (err) throw err;
    res.redirect("/" + type + "?id_proyecto=" + id_proyecto + "&id_producto=" + id_producto);
  });
});

router.post('/eliminarElemento', function (req, res, next) {
  const db = require('../database/config');
  let id = req.body.id_elemento;
  let id_proyecto = req.body.id_proyecto
  let id_producto = req.body.id_producto
  db.query(`DELETE FROM ${type} WHERE id_${type} = ?`, id, function (err, rows, fields) {
    if (err) throw err;
    res.redirect("/" + type + "?id_proyecto=" + id_proyecto + "&id_producto=" + id_producto);
  });
});


module.exports = router;
