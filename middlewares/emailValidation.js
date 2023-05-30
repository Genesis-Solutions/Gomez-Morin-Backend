import dns from "dns";

/**
 * Checks if an email exists on the mail server.
 *
 * @returns {function} Middleware function that handles email verification.
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @param {function} next - Middleware function to pass to the next middleware.
 */

export const emailExists = () => async (req, res, next) => {
  const { email } = req.body;
  const domain = email.split("@")[1];
  const addresses = await new Promise(() => {
    dns.resolveMx(domain, (error, addresses) => {
      if (error || addresses.length === 0) {
        return res.status(401).send({
          message: "El correo ingresado no existe",
        });
      } else {
        next();
      }
    });
  });
};
