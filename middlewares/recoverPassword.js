import User from "../models/user.model.js";
import bcrypt from "bcrypt";

/**
 * Middleware function to recover a user's password.
 *
 * @returns {function} Middleware function that handles password recovery.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {function} next - The next middleware function to pass control to.
 */
export const recoverPassword = () => async (req, res, next) => {
  const { title, textBody, recipientEmail, userName } = req.body;

  const user = await User.findOne({ userName: userName }).populate("ptrRol");
  const userEmail = await User.findOne({ email: recipientEmail }).populate(
    "ptrRol"
  );

  if (!user || !userEmail) {
    return res.status(401).send({
      message: "El usuario o correo ingresado no existen",
    });
  }

  if (user.userName !== userEmail.userName) {
    return res.status(401).send({
      message: "El usuario o correo ingresado no coinciden",
    });
  }

  const temporaryPassword = generateTemporaryPassword();
  const saltRounds = 10;
  const hashedTemporaryPassword = await bcrypt.hash(
    temporaryPassword,
    saltRounds
  );

  await User.updateOne(
    { userName: user.userName },
    {
      password: hashedTemporaryPassword,
    }
  );

  const newString =
    "<strong>" + temporaryPassword + "</strong></div></body></html>";
  const updatedTextBody = textBody.concat(newString);

  req.body.textBody = updatedTextBody;

  next();
};

const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,|=-])[a-zA-Z\d!@#$%^&*()_+}{"':;?/>.<,|=-]{8,15}$/;
/**
 * Generates a temporary password.
 *
 * @returns {string} The generated temporary password.
 */
const generateTemporaryPassword = () => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+}{\"':;?/>.<,|=-";
  let temporaryPassword = "";

  while (!passwordRegex.test(temporaryPassword)) {
    temporaryPassword = "";

    for (let i = 0; i < 15; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      temporaryPassword += characters[randomIndex];
    }
  }

  return temporaryPassword;
};
