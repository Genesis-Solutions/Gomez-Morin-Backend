import nodemailer from "nodemailer";

async function sendNotification(req,res){

  try{
    const {title,textBody,recipientEmail} = req.body;
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
    to : `${recipientEmail}`,
    subject : `${title}`,
    html : `${textBody}`
  }

  const transport = nodemailer.createTransport(config);

  const info = await transport.sendMail(mensaje);

  res.status(201).send({message: 'Correo enviado'});
}catch(error){
  res.status(404).send({message: error.message});
}
}

export default sendNotification;