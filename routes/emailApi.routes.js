import express from "express";
import sendNotification from "../controllers/api.controllers.js";

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

export default router;
