/**
 * Controller class for handling User model requests.
 * Extends BaseController.
 */
import BaseController from "./base.controllers.js";
import User from "../models/user.model.js";

class UserController extends BaseController {
  /**
   * Creates a new instance of UserController.
   * @constructor
   */
  constructor() {
    super(User, "Rol");
  }
}

/**
 * Instance of UserController class used to handle User model requests.
 */
export const userController = new UserController();