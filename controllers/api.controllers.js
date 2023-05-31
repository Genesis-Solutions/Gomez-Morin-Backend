import nodemailer from "nodemailer";

async function enviarMail(){

  const config = {
    host : 'smtp-mail.outlook.com',
    port : 587,
    auth : {
      user : 'ceceqGM@outlook.com',
      pass : 'fvqausclpulniayk'
    }
  }

  const mensaje = {
    from : 'ceceqGM@outlook.com',
    to : 'a01067963@tec.mx, flavioruvalcabaleija@gmail.com',
    subject : 'Prueba',
    text : 'Hola magañita'
  }

  const transport = nodemailer.createTransport(config);

  const info = await transport.sendMail(mensaje);

  console.log(info);

}

enviarMail();