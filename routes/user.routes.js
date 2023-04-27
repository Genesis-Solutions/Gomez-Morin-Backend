/**
 * Router for handling User model requests.
 */
import express from "express";
import { userController } from "../controllers/user.controllers.js";

const router = express.Router();

/**
 * GET method for retrieving all User documents.
 * @name GET /users
 * @function
 * @memberof module:routers/user
 * @param {function} userController.findAll - Controller method for finding all User documents.
 * @returns {Object} - Express middleware function that calls userController.findAll.
 */
router.get("/", userController.findAll.bind(userController));

/**
 * GET method for retrieving a User document by id.
 * @name GET /users/:id
 * @function
 * @memberof module:routers/user
 * @param {function} userController.findById - Controller method for finding a User document by id.
 * @returns {Object} - Express middleware function that calls userController.findById.
 */
router.get("/:id", userController.findById.bind(userController));

/**
 * POST method for creating a new User document.
 * @name POST /users
 * @function
 * @memberof module:routers/user
 * @param {function} userController.create - Controller method for creating a new User document.
 * @returns {Object} - Express middleware function that calls userController.create.
 */
router.post("/", userController.create.bind(userController));

/**
 * PUT method for updating a User document by id.
 * @name PUT /users/:id
 * @function
 * @memberof module:routers/user
 * @param {function} userController.updateById - Controller method for updating a User document by id.
 * @returns {Object} - Express middleware function that calls userController.updateById.
 */
router.put("/:id", userController.updateById.bind(userController));

/**
 * DELETE method for deleting a User document by id.
 * @name DELETE /users/:id
 * @function
 * @memberof module:routers/user
 * @param {function} userController.deleteById - Controller method for deleting a User document by id.
 * @returns {Object} - Express middleware function that calls userController.deleteById.
 */
router.delete("/:id", userController.deleteById.bind(userController));

/**
 * Router object for User model requests.
 * @module routers/user
 */
export default router;