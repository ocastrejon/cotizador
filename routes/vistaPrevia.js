var express = require('express');
var router = express.Router();

const type = "vistaPrevia"

router.get('/', function (req, res, next) {
  const db = require('../database/config')
  let id_proyecto = req.query.id_proyecto
  db.query(`SELECT 	id_elemento, id_producto, elemento.id_proyecto, 
                    categoria, clase, medida, tamanio, 
                    proveedor, precio, cantidad, importe, 
                    largo, ancho, grosor, pies, producto
            FROM elemento
            INNER JOIN medida USING (id_medida)
            INNER JOIN material USING (id_material)
            INNER JOIN categoria USING (id_categoria) 
            INNER JOIN clase USING (id_clase)
            INNER JOIN tamanio USING (id_tamanio)
            INNER JOIN proveedor USING (id_proveedor)
            INNER JOIN producto USING (id_producto)
            WHERE elemento.id_proyecto = ?`, id_proyecto, (err, elemento, fields) => {
    if (err) throw err;
    db.query(`SELECT * from extra WHERE id_proyecto = ? `, id_proyecto, (err, extra, fields) => {
      if (err) throw err;
      db.query(`SELECT id_producto from extra WHERE id_proyecto = ? `, id_proyecto, (err, id_producto, fields) => {

        var productos = []
        for (let index = 0; index < id_producto.length; index++) {
          var elementos = []
          var extras = []
          const element = id_producto[index];
          for (let index2 = 0; index2 < elemento.length; index2++) {
            const element2 = elemento[index2];
            if(element2.id_producto == element.id_producto)
              elementos.push(element2)
          }
          for (let index3 = 0; index3 < extra.length; index3++) {
            const element3 = extra[index3];
            if(element3.id_producto == element.id_producto)
              extras.push(element3)
          }
          productos.push({elementos: elementos, extras: extras})
        }
        res.render(type, { productos: productos });
      })
    })
  })
});

module.exports = router;
