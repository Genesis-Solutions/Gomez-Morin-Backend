import Form from "../models/form.model.js";
import { encryptFileName } from "../securityUtils/security.js";

/**
 * This module contains the FormController class responsible for handling Form-related HTTP requests and responses.
 *
 * @module FormController
 * @requires Security
 * @requires Form
 * @requires encryptFileName
 */

class FormController extends BaseController {
  /**
   * Creates a new instance of FormController.
   *
   * @constructor
   */
  constructor() {
    super(Form, "Request");
  }
  /**
   * Creates a new Form instance with encrypted file names for the uploaded documents.
   *
   * @function createForm
   * @async
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @returns {object} - Returns the created Form object with status code 201 on success.
   * @throws {object} - Throws an error object with status code 404 on failure.
   */
  async createForm(req, res) {
    try {
      // Encrypts the file names of the uploaded documents and creates a new Form instance with them.
      req.files.map((file, index) => {
        let newBody = req.body;
        if (index === 0) {
          const ineDoc = encryptFileName(file.filename);
          newBody = { ...req.body, ineDoc };
        }
        if (index === 1) {
          const addressDoc = encryptFileName(file.filename);
          newBody = { ...newBody, addressDoc };
        }
        if (index === 2) {
          const curpDoc = encryptFileName(file.filename);
          newBody = { ...newBody, curpDoc };
        }
        if (index === 3) {
          const extraDoc = encryptFileName(file.filename);
          newBody = { ...newBody, extraDoc };
        }
      });
      await Form.create(newBody);
      const items = await Form.find();
      res.status(201).json(items);
    } catch (err) {
      res.status(404).send({ message: err.message });
    }
  }
}
