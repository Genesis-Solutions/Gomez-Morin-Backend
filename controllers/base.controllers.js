import mongoose from "mongoose";

/**
 * This class represents a base controller for handling CRUD operations on a given Mongoose model.
 */
class BaseController {
  /**
   * Constructs a new BaseController object.
   * 
   * @param {mongoose.Model} model - The Mongoose model to operate on.
   * @param {String} populateTable - The name of the table to populate (optional).
   */
  constructor(model, populateTable = "") {
    this.model = model;
    this.populateTable = populateTable;
  }

  /**
   * Creates a new resource in the database based on the provided request data.
   * 
   * @param {Request} req - The incoming HTTP request.
   * @param {Response} res - The outgoing HTTP response.
   */
  async create(req, res) {
    try {
      if (req.file) {
        const urlImg = req.file.filename;
        const newBody = { ...req.body, urlImg };
        await this.model.create(newBody);
        const items = await this.model.find();
        res.status(201).json(items);
      } else {
        console.log(req.body);
        await this.model.create(req.body);
        const items = await this.model.find();
        res.status(201).json(items);
      }
    } catch (err) {
      res.status(404).send({ message: err.message });
    }
  }

  /**
   * Finds a resource in the database by its unique identifier.
   * 
   * @param {Request} req - The incoming HTTP request.
   * @param {Response} res - The outgoing HTTP response.
   */
  async findById(req, res) {
    try {
      const { id } = req.params;
      const _id = new mongoose.Types.ObjectId(id);
      if (this.populateTable != "") {
        const item = await this.model
          .findById(_id)
          .populate(this.populateTable);
        res.status(200).json(item);
      } else {
        const item = await this.model.findById(_id);
        res.status(200).json(item);
      }
    } catch (err) {
      res.status(404).send({ message: err.message });
    }
  }

  /**
   * Finds all resources in the database.
   * 
   * @param {Response} res - The outgoing HTTP response.
   */
  async findAll({ res }) {
    try {
      if (this.populateTable != "") {
        const item = await this.model.find().populate(this.populateTable);
        res.status(200).json(item);
      } else {
        const item = await this.model.find();
        res.status(200).json(item);
      }
    } catch (err) {
      res.status(404).send({ message: err.message });
    }
  }

  /**
   * Updates a resource in the database by its unique identifier.
   * 
   * @param {Request} req - The incoming HTTP request.
   * @param {Response} res - The outgoing HTTP response.
   */
  async updateById(req, res) {
    try {
      const { id } = req.params;
      const _id = new mongoose.Types.ObjectId(id);
      await this.model.findByIdAndUpdate(_id, req.body, { new: true });
      const items = await this.model.find();
      res.status(201).json(items);
    } catch (err) {
      res.status(404).send({ message: err.message });
    }
  }

  /**
   * Deletes a document from the database for the given model by its ID.
   * 
   * @param {Object} req - The HTTP request object containing the ID of the document to delete.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise} - A promise that resolves to the deleted document(s) or rejects with an error.
   */
  async deleteById(req, res) {
    try {
      const { id } = req.params;
      const _id = new mongoose.Types.ObjectId(id);
      await this.model.findByIdAndDelete(_id);
      const items = await this.model.find();
      res.status(201).json(items);
    } catch (err) {
      res.status(404).send({ message: err.message });
    }
  }
}

export default BaseController;
