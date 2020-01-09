var express = require('express');
var router = express.Router();
const PDFDocument = require('pdfkit');
var pdf = require('html-pdf');

router.post('/', function (req, res, next) {
    const db = require('../database/config')
    let id_proyecto = req.body.id_proyecto
    db.query(`SELECT * from proyecto WHERE id_proyecto = ? `, id_proyecto, (err, proyecto, fields) => {
        if (err) throw err;
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
                db.query(`SELECT * from caracteristica WHERE id_proyecto = ? `, id_proyecto, (err, caracteristica, fields) => {
                    if (err) throw err;
                    db.query(`SELECT id_producto from extra WHERE id_proyecto = ? `, id_proyecto, (err, id_producto, fields) => {
                        if (err) throw err;
                        var productos = []
                        for (let index = 0; index < id_producto.length; index++) {
                            var elementos = []
                            var extras = []
                            var caracteristicas = []
                            const element = id_producto[index];
                            for (let index2 = 0; index2 < elemento.length; index2++) {
                                const element2 = elemento[index2];
                                if (element2.id_producto == element.id_producto)
                                    elementos.push(element2)
                            }
                            for (let index3 = 0; index3 < extra.length; index3++) {
                                const element3 = extra[index3];
                                if (element3.id_producto == element.id_producto)
                                    extras.push(element3)
                            }
                            for (let index4 = 0; index4 < caracteristica.length; index4++) {
                                const element4 = caracteristica[index4];
                                if (element4.id_producto == element.id_producto)
                                    caracteristicas.push(element4)
                            }
                            productos.push({ elementos: elementos, extras: extras, caracteristicas: caracteristicas })
                        }
                        // productos.push({ proyecto: proyecto })
                        // console.log(proyecto[0].nombre_proyecto)

                        var fecha = new Date();

                        var beginFile = `                            
                            <!DOCTYPE html>
                            <html lang="es">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                                <title>Document</title>
                            </head>
                            <body style="font-size: 1.4rem;">`

                        var endFile = `
                            </body>
                            </html>`

                        var footer = `
                            <div id="pageFooter" style="border-top: 1px solid #ddd; padding-top: 5px;">
                                <p style="color: #666; margin: 0; padding-bottom: 5px; text-align: center; font-family: sans-serif; font-size: .65em">
                                    Ing. Jesús Heriberto Gutiérrez Villalobos<br />
                                    GUVJ940625393<br />
                                    3335560639<br />
                                    Calzada del Paraíso 91-a, Ciudad Granja, Zapopan Jalisco<br />
                                    heriberto.gtzv@gmail.com
                                </p>
                            </div>`

                        var sign = `
                            <tr>
                                <td>
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%">
                                        <tr>
                                            <td style="padding: 10px 70px 0 70px;">
                                                <br>
                                                <br>
                                                <br>
                                                Para iniciar el trabajo se requiere el 50% de anticipo, el resto 50% al
                                                finalizar el trabajo. El tiempo de entrega del pedido es de 20 días hábiles
                                                a partir del anticipo.
                                                <br>
                                                <br>
                                                <br>
                                                Atentamente
                                                <br>
                                                <br>
                                                <br>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 10px 100px 0 100px; text-align:center;">
                                            ________________________________________________<br>
                                                Ing. Jesús Heriberto Gutiérrez Villalobos
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>`

                        var pageHeader = `
                            <div id="pageHeader" style="border-bottom: 1px solid #ddd; padding-bottom: 5px;">
                                <center>
                                    <img src="/logo2.png" width="170" height="90" align="center">
                                </center>
                            </div>`
                        
                        var table1tr1 = `
                            <tr>
                                <td align="left" style="padding: 0 30px 0 90px;">
                                    ${proyecto[0].prefijo_interesado}. ${proyecto[0].nombre_interesado} ${proyecto[0].apellido_interesado}
                                    <br>
                                    <br>
                                </td>
                            </tr>`

                        var table1tr2 = `
                            <tr>
                                <td style="padding: 0 30px 0 30px;">
                                    <table border="0" class="divImg" cellpadding="0" cellspacing="0"
                                        style="border-collapse: collapse; width:100%; height:100%;">
                                        <tr>
                                            <td style="text-align:left;">
                                                ${proyecto[0].empresa_interesado}
                                            </td>
                                            <td style="text-align:right;">
                                                Fecha: ${fecha}
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>`

                        var productImage = `
                            <td style="font-size: 0; line-height: 0;" width="20">
                                &nbsp;
                            </td>
                            <td width="260" valign="top">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%">
                                    <tr>
                                        <td>
                                            <img src="/logo2.png" alt="" width="100%" height="140" style="display: block;" />
                                        </td>
                                    </tr>
                                </table>
                            </td>`

                        var halfTop = `
                            ${pageHeader}
                            <table border="0" class="divImg" cellpadding="0" cellspacing="0" style="border-collapse: collapse; width:100%; height:100%;">
                                ${table1tr1}
                                ${table1tr2}
                                <tr style="background-image: url('/logo3.jpg'); background-size: contain; background-repeat: no-repeat;  background-size: 100% 100%;">
                                    <td style="padding: 40px 30px 40px 30px;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%">`

                        var halfBottom = `
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            ${footer}`

                        var repeat = ''
                        for (let index = 0; index < productos.length; index++) {
                            const element = productos[index];
                            var caracHTML = ''
                            for (let index2 = 0; index2 < element.caracteristicas.length; index2++) {
                                const element2 = element.caracteristicas[index2];
                                caracHTML += `<li>${element2.caracteristica}</li>`
                            }
                            // console.log(element.elementos[0].producto)

                            var table2tr2 = `
                                <tr><td><table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%"><tr><td width="260" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%"><tr><td style="padding: 20px 0 20px 20px;">
                                    <h3>${element.elementos[0].producto}</h3>
                                    <ul>${caracHTML}</ul></td></tr></table>
                                    </td>${productImage}</tr></table></td>
                                </tr>`

                            var table3tr1td1 = `
                                <td style="text-align: center;"><table border="1" cellpadding="0" cellspacing="0" width="100%" height="100%"><tr><td>Cantidad</td><td>Concepto</td></tr><tr>
                                    <td>1</td>
                                    <td>${element.caracteristicas[0].caracteristica}</td></tr></table>
                                </td>`

                            var table3tr1td2 = `
                                <td style="text-align: center;"><table border="1" cellpadding="0" cellspacing="0" width="100%" height="100%">
                                        <tr><td>Costo Unitario</td><td>Importe</td></tr>
                                        <tr><td>$23,326.4</td><td>$23,326.4</td></tr>
                                        <tr><td>Subtotal</td><td>$23,326.4</td></tr>
                                        <tr><td>IVA</td><td>$2,732.49</td></tr>
                                        <tr><td>Total</td><td>$27,058.72</td></tr></table>
                                </td>`

                            var table2tr3 = `
                                <tr style="margin-botom:3rem;"><td><table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%"><tr>
                                    ${table3tr1td1}
                                    ${table3tr1td2}
                                </tr></table></td></tr>`
                            
                            var table2tr1 = `
                                <tr><td>
                                    Estimad@ ${proyecto[0].prefijo_interesado}. ${proyecto[0].nombre_interesado} ${proyecto[0].apellido_interesado}
                                    <br>Me permito presentarle la cotización de ${element.elementos[0].producto} con las siguientes características:
                                <br></td></tr>`

                            repeat += `
                                ${table2tr1}
                                ${table2tr2}
                                ${table2tr3}
                            `;
                            index++;
                        }
                            
                        var contenido = `
                            ${beginFile}
                                ${halfTop}
                                    ${repeat}
                                    ${sign}
                                ${halfBottom}
                            ${endFile}`

                        // const path = "C:/Users/oscar/Documents/twpDigital/Cotizador/"
                        // const base = path.resolve(''); //  just relative path to absolute path 
                        var options = {
                            "format": 'letter',
                            "border": {
                                "right": "1in",
                                "left": "1in"
                            },
                            "header": {
                                "height": "45mm"
                            },
                            "footer": {
                                "height": "20mm"
                            },
                            // "base": "file://"
                            "base": `file:///Users/oscar/Documents/twpDigital/Cotizador/assets`,// you have to set 'file://'
                        };

                        pdf.create(contenido, options).toFile(`./pdf/salida2.pdf`, function (err, ress) {
                            if (err) throw err
                            res.download(`./pdf/salida2.pdf`)
                        })
                    })
                })
            })
        })
    })
});

module.exports = router;
