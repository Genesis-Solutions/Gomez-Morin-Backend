import nodemailer from "nodemailer";
/**
 * Sends a notification email.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
async function sendNotification(req, res) {
  try {
    const { title, textBody, recipientEmail } = req.body;
    const config = {
      host: "smtp-mail.outlook.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    };

    const mensaje = {
      from: "ceceqGM@outlook.com",
      to: `${recipientEmail}`,
      subject: `${title}`,
      html: `${textBody}`,
    };

    const transport = nodemailer.createTransport(config);

    const info = await transport.sendMail(mensaje);

    res.status(201).send({ message: "Correo enviado" });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
}

export default sendNotification;
