var express = require('express');
var router = express.Router();
const fs = require('fs');
        
const type = "imagen"

router.get('/', function (req, res, next) {
  fs.readdir("./public/imagenes/", function (err, archivos) {
    if (err) throw err;
    res.render(type, { type: archivos });
  })
});

router.post('/upload',(req,res) => {
  let EDFile = req.files.file
  EDFile.mv(`./public/imagenes/${EDFile.name}`,err => {
      if(err) return res.status(500).send({ message : err })
      return res.redirect("/" + type);
  })
})

router.post('/eliminarImagen', function (req, res, next) {
  fs.unlinkSync(`./public/imagenes/${req.body.imagenName}`);
  res.redirect("/" + type);    
});

module.exports = router;
