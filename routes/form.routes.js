/**
 * Express router instance for handling form submission requests
 * 
 * @module routes/formRoutes
 */

import express from "express";
import { formController } from "../controllers/form.controllers.js";
import { encrypt } from "../middlewares/encrypting.js";

/**
 * Express router to handle POST requests to /solicitud endpoint
 * 
 * @type {object}
 * @const
 * @namespace formRoutes
 */
const router = express.Router();

/**
 * POST request handler for submitting form data
 *
 * @name POST /solicitud
 * @function
 * @memberof module:routes/formRoutes
 * @inner
 * @param {string} path - Express path
 * @param {function} encrypt - Middleware for encrypting request data
 * @param {function} formController.createForm - Form submission controller function
 * @returns {void}
 */
router.post("/solicitud", encrypt, formController.createForm);

export default router;
