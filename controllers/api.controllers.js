import nodemailer from "nodemailer";

async function enviarMail(){

  const config = {
    host : 'smtp.gmail.com',
    port : 587,
    auth : {
      user : 'sorzanosantiago@gmail.com',
      pass : 'vnmjdncsxioqiwfb'
    }
  }

  const mensaje = {
    from : 'sorzanosantiago@gmail.com',
    to : 'a01067963@tec.mx, flavioruvalcabaleija@gmail.com',
    subject : 'Prueba',
    text : 'Hola magañita'
  }

  const transport = nodemailer.createTransport(config);

  const info = await transport.sendMail(mensaje);

  console.log(info);

}

enviarMail();