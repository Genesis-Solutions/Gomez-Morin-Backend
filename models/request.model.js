import mongoose, { Schema } from "mongoose";

/**
 * This module defines a Mongoose schema for a Request object.
 *
 * @module Request
 */
/**
 * Defines the schema for a Request object.
 *
 * @type {Schema}
 */
const RequestSchema = new mongoose.Schema({
    /**
     * The unique identifier for the request.
     *
     * @type {ObjectId}
     * @required
     */
    idRequest: {
        type: Schema.Types.ObjectId,
        required: true,
    },

    /**
     * The status of the request.
     *
     * @type {String}
     * @required
     */
    status: {
        type: String,
        required: true,
    },

    /**
     * The pointer to the user who made the request.
     *
     * @type {ObjectId}
     */
    userPtr: {
        type: Schema.Types.ObjectId,
    },
});

/**

* The Mongoose model for a Request object.
*
* @type {Model}
*/

const Request = mongoose.model("Request", RequestSchema);

export default Request;