import dns from "dns";
import User from "../models/user.model.js";

/**
 * Checks if an email exists on the mail server.
 *
 * @returns {function} Middleware function that handles email verification.
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @param {function} next - Middleware function to pass to the next middleware.
 */

export const emailExists = () => async (req, res, next) => {
  const { userName, email } = req.body;
  const user = await User.findOne({ userName: userName }).populate("ptrRol");
  const userEmail = await User.findOne({ email: email }).populate("ptrRol");
  const domain = email.split("@")[1];
  const addresses = await new Promise(() => {
    dns.resolveMx(domain, (error, addresses) => {
      if (error || addresses.length === 0) {
        return res.status(401).send({
          message: "El correo ingresado no existe",
        }); 
      }
      if (user) {
        return res.status(401).send({
          message: "El usuario ingresado ya esta registrado",
        });
      }
      if (userEmail) {
        return res.status(401).send({
          message: "El correo ingresado ya esta registrado",
        });
      }
      next();
    });
  });
};
