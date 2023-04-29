/**
 * Controller class for handling User model requests.
 * Extends BaseController.
 */
import BaseController from "./base.controllers.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController extends BaseController {
  /**
   * Creates a new instance of UserController.
   * @constructor
   */
  constructor() {
    super(User, "Rol");
  }

  /**
   * Handles user login by verifying their credentials and generating an access token upon successful authentication.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} The HTTP response with the generated access token or an error message.
   */
  async loginHandler(req, res) {
    try {
      const verifyToday = new Date();
      let diffInMinutes = 0;
      const { userName, password } = req.body;

      // Find the user with the given username
      const user = await User.findOne({ userName: userName });

      // If the user is not found, send a 404 response with an error message
      if (!user)
        return res
          .status(404)
          .send({ message: "El usuario ingresado no existe" });

      // If the user has never tried to log in before and is not blocked, initialize their login attempts and block status
      if (!user.tryNum && !user.isBlocked) {
        await User.updateOne(
          { userName: userName },
          {
            tryNum: 0,
            isBlocked: false,
          }
        );
      }

      // If the user has been blocked before, calculate the difference in minutes between the current time and the time they were blocked
      if (user.blockedDate && verifyToday >= user.blockedDate) {
        const blockedDate = user.blockedDate;
        const diffDates = Math.abs(
          verifyToday.getTime() - blockedDate.getTime()
        );
        diffInMinutes = Math.floor(diffDates / (1000 * 60));
      }

      // If the user is currently blocked and the block time has not yet expired, send a 403 response with an error message
      if (user.isBlocked && diffInMinutes < 5) {
        return res
          .status(403)
          .send({ message: "No ha pasado el tiempo de bloqueo" });
      }

      // If the user is currently blocked and the block time has expired, reset their login attempts and unblock them
      if (user.isBlocked && diffInMinutes >= 5) {
        await User.updateOne(
          { userName: userName },
          {
            tryNum: 0,
            isBlocked: false,
            blockedDate: undefined,
          }
        );
        return res
          .status(403)
          .send({ message: "Tus credenciales son incorrectas" });
      }

      // If the user has exceeded the maximum number of login attempts, block them and send a 403 response with an error message
      if (user.tryNum >= 5) {
        const today = new Date();
        await User.updateOne(
          { userName: userName },
          {
            isBlocked: true,
            blockedDate: today,
          }
        );
        return res.status(403).send({ message: "Límite de intentos superado" });
      }

      // Verify the user's password
      const verifyPassword = await bcrypt.compare(password, user.password);

      // If the password is incorrect, increment the user's login attempts and send a 403 response with an error message
      if (!verifyPassword) {
        const userCounter = user.tryNum;
        await User.updateOne(
          { userName: userName },
          { tryNum: userCounter + 1 }
        );

        return res
          .status(403)
          .send({ message: "Tus credenciales son incorrectas" });
      }

      // Generate an access token for the user
      const accessToken = jwt.sign(
        {
          id: user._id,
          userName: user.userName,
          ptrRol: user.ptrRol,
          email: user.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      // Set the access token as a cookie and send a 202 response with the access token
      res.cookie("acT", accessToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(202).send({ accessToken });
    } catch (err) {
      res.status(404).send({ message: err.message });
    }
  }

  /**
   *
   * Asynchronously handles a logout request.
   *
   * @param {object} req - The HTTP request object.
   * @param {object} res - The HTTP response object.
   * @returns {Promise<void>} A promise that resolves with no value.
   * @throws {Error} If an error occurs during the logout process.
   */

  async logoutHandler(req, res) {
    try {
      // Extract access token from cookie
      const accessToken = req.cookies?.acT;

      // Check if access token is present, if not, user is already logged out
      if (!accessToken)
        return res.status(200).json({ message: "logout successfully" });

      // Clear access token cookie
      res.clearCookie("acT", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });

      res.status(200).json({ message: "logout successfully" });
    } catch (err) {
      res.status(404).send({ message: err.message });
    }
  }
}

/**
 * Instance of UserController class used to handle User model requests.
 */
export const userController = new UserController();
