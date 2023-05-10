import Form from "../models/form.model.js";
import { encryptFileName } from "../securityUtils/security.js";
import BaseController from "./base.controllers.js";

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
            super(Form, "User");
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
            let newBody = req.body;
            // Encrypts the file names of the uploaded documents and creates a new Form instance with them.
            req.files.map((file, index) => {
                if (index === 0) {
                    const ineDoc = encryptFileName(file.filename);
                    newBody = {...req.body, ineDoc };
                }
                if (index === 1) {
                    const addressDoc = encryptFileName(file.filename);
                    newBody = {...newBody, addressDoc };
                }
                if (index === 2) {
                    const curpDoc = encryptFileName(file.filename);
                    newBody = {...newBody, curpDoc };
                }
                if (index === 3) {
                    const extraDoc = encryptFileName(file.filename);
                    newBody = {...newBody, extraDoc };
                }
            });
            const newForm = await Form.create(newBody);
            await Form.updateOne({ _id: newForm._id }, { status: "En Proceso" });
            const items = await Form.find();
            res.status(201).json(items);
        } catch (err) {
            res.status(404).send({ message: err.message });
        }
    }

    /**
     * Creates a new Form instance with encrypted file names for the uploaded documents for moral entity.
     *
     * @function createForm
     * @async
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     * @returns {object} - Returns the created Form object with status code 201 on success.
     * @throws {object} - Throws an error object with status code 404 on failure.
     */
    async createFormMoral(req, res) {
        try {
            let newBody = req.body;
            if (req.files) {
                const membretatedLetterDoc = encryptFileName(req.files[0].filename);
                newBody = {...req.body, membretatedLetterDoc };
            }
            const newForm = await Form.create(newBody);
            await Form.updateOne({ _id: newForm._id }, { status: "En Proceso" });
            const items = await Form.find();
            res.status(201).json(items);
        } catch (err) {
            res.status(404).send({ message: err.message });
        }
    }

    /**
     * Handles client GET requests by finding all forms associated with the user specified by the id parameter, and
     * returning the results in JSON format.
     *
     * @param {object} - req The request object containing information about the client request, including the id parameter.
     * @param {object} - res The response object used to send a response back to the client.
     * @return {object} - The user's form requests, returned as a JSON object.
     * @throws {object} - Throws an error object with status code 404 on failure.
     */
    async getClientRequest(req, res) {
        try {
            const { id } = req.params;
            const userRequests = await Form.find({ userPtr: id });
            res.status(201).json(userRequests);
        } catch (err) {
            res.status(404).send({ message: err.message });
        }
    }
}
export const formController = new FormController();