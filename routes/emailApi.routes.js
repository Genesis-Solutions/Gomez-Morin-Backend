import express from "express";
import sendNotification from "../controllers/api.controllers.js";
import { recoverPassword } from "../middlewares/recoverPassword.js";

const router = express.Router();

/**
 * Routes a POST request to send a notification.
 *
 * @name POST /
 * @function
 * @memberof module:routes/api
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.post("/", sendNotification);

/**
 * Routes a POST request to send a notification.
 * @name POST /getPassword
 * @function
 * @memberof module:routes/api
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @see module:middlewares/recoverPassword
 **/
router.post("/getPassword", recoverPassword(), sendNotification);


export default router;
