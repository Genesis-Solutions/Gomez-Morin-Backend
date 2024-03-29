/**
 * Express router instance for handling form submission requests
 *
 * @module routes/formRoutes
 */

import express from "express";
import { formController } from "../controllers/form.controllers.js";
import { encrypt } from "../middlewares/encrypting.js";
import { limitRole } from "../middlewares/abac.js";
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
 *
 * @returns {void}
 */
router.post("/solicitud", encrypt, formController.createForm);

/**
 * Registers a POST route for the "/request-letter" path that first applies the encrypt middleware and then
 * handles form submissions using the provided formController's createFormMoral method.
 *
 * @param {string} path - The router instance used to register the route.
 * @param {function} encrypt - The middleware function used to encrypt the form data.
 * @param {function} formController.createFormMoral - The controller responsible for handling form-related requests.
 */
router.post("/request-letter", encrypt, formController.createFormMoral);

/**
 * Registers a route with the HTTP GET method for retrieving all requests.
 *
 * @param path the endpoint path ("/request-all")
 * @param handler the handler function for processing the request (formController.getAllRequest)
 */
router.post(
  "/request-all",
  limitRole("S.P"),
  formController.findAll.bind(formController)
);

router.post("/request-documents", formController.getDocuments);
/**
 * Registers a route with the HTTP GET method for retrieving details of a request by ID.
 *
 * @param path the endpoint path ("/requestDetail/:id")
 * @param handler the handler function for processing the request (formController.findById)
 * @returns {Object} - The request object.
 * @throws {Error} - If an error occurs during the retrieval process.
 */
router.post(
  "/requestDetail/:id",
  limitRole("S.P"),
  formController.findById.bind(formController)
);
/**
 * Registers a GET route for the root path ("/") that handles client requests using the provided formController's
 * getClientRequest method.
 *
 * @param {string} path - Express path
 * @param {function} formController.getClientRequest - The controller responsible for handling form-related requests.
 */
router.get("/:id", formController.getClientRequest);

/**
 * Updates a request by ID.
 *
 * @param {String} id - The ID of the request to update.
 * @returns {Object} - The updated request object.
 * @throws {Error} - If an error occurs during the update process.
 */
router.patch(
  "/updateRequest/:id",
  limitRole("S.P"),
  formController.updateById.bind(formController)
);

export default router;
