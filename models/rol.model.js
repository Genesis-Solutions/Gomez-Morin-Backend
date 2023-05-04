/**
 * This module imports the Mongoose library and defines a schema and a model for a form document.
 *
 * The form document represents a user-submitted form for event planning and includes various fields
 * for event details, contact information, equipment requirements, and other specifications.
 */
import mongoose, { Schema } from "mongoose";

// Commented out for now.
// const ModuleSchema = new mongoose.Schema({

//     create: {
//       type: Boolean,
//       required: true
//     },
//     read: {
//       type: Boolean,
//       required: true
//     },
//     update: {
//       type: Boolean,
//       required: true
//     },
//     delete: {
//       type: Boolean,
//       required: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//   });

/**
 * Defines a Mongoose schema for a `roles` collection in a MongoDB database.
 *
 */

const RolSchema = new mongoose.Schema({
  /**
   * The role name.
   */
  rol: {
    type: String,
  },

  // Commented out for now.
  // /**
  //  * The modules associated with this role.
  //  */
  // modules: {
  //     type: [ModuleSchema],
  //     required: true
  // }
});

/**
 * The Mongoose model for the `roles` collection.
 *
 * @type {mongoose.Model<mongoose.Document<any, {}>>}
 */
const Rol = mongoose.model("roles", RolSchema);

export default Rol;
