var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var novedadesModel = require('../models/novedadesModel');
var cloudinary = require('cloudinary').v2;

/* GET home page. */
router.get('/', async function (req, res, next) {
  var novedades = await novedadesModel.getNovedades();

  var novedades = novedades.splice(0, 5);

  var novedades = novedades.map(novedad => {
    if (novedad.img_id) {
      const imagen = cloudinary.url(novedad.img_id, {
        width: 460,
        crop: 'fill'
      });
      return {
        ...novedad,
        imagen
      }
    } else {
      return {
        ...novedad,
        imagen: ''
      }
    }
  });
  res.render('index',{
    novedades
  });
});

router.post('/', async (req, res, next) => {

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var tel = req.body.tel;
  var mensaje = req.body.mensaje;
  
  console.log(req.body)
  
  var obj = {
    to:'veronica_silva77@outlook.com',
    subject:'Contacto desde cerveceria x',
    html: nombre +" "+ apellido + " " + "se contacto a través de la web y quiere más informacion a este correo : " + email + ". <br> Su tel es: " + tel + ". <br> Ademas, hizo este comentario : " + mensaje 
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  var info = await transport.sendMail(obj);

  //res.render('index', {
   // message: 'Mensaje enviado correctamente'
  //});

  res.json({
    message: 'Mensaje enviado correctamente'
  });
});

module.exports = router;
