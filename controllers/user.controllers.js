import BaseController from './base.controllers.js';
import User from '../models/user.model.js';

class UserController extends BaseController {
    constructor() {
        super(User);
    }
}

export const userController = new UserController();