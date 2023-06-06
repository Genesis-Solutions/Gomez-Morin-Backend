/**
 * This module imports the Mongoose library and defines a schema and a model for a form document.
 *
 * The form document represents a user-submitted form for event planning and includes various fields
 * for event details, contact information, equipment requirements, and other specifications.
 */
import mongoose, { Schema } from "mongoose";

/**
 * Defines the schema for a form document.
 *
 * The schema specifies the data types, validation rules, and other properties for each field in the form.
 * Each field corresponds to a key-value pair in a form document.
 */
const FormSchema = new mongoose.Schema({
  idForm: {
    type: Schema.Types.ObjectId,
  },
  userPtr: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  weekDays: {
    type: String,
  },
  status: {
    type: String,
  },
  typeEvent: {
    type: String,
  },
  nameEvent: {
    type: String,
  },
  targetAudience: {
    type: String,
  },
  startDay: {
    type: String,
    maxlength: 15,
    minlength: 10,
  },
  endDay: {
    type: String,
    maxlength: 15,
    minlength: 10,
  },
  startTime: {
    type: String,
    maxlength: 15,
    minlength: 5,
  },
  endTime: {
    type: String,
    maxlength: 15,
    minlength: 5,
  },
  authorities: {
    type: String,
  },
  cost: {
    type: Number,
  },
  socialNetwork: {
    type: String,
  },
  urlDocs: {
    type: String,
    validate: {
      validator: function (v) {
        return /\.pdf$/.test(v);
      },
      message: (props) => `${props.value} is not a valid PDF file.`,
    },
  },
  ineDoc: {
    type: String,
  },
  curpDoc: {
    type: String,
  },
  addressDoc: {
    type: String,
  },
  extraDoc: {
    type: String,
  },
  membretatedLetterDoc: {
    type: String,
  },
  requestDate: {
    type: String,
    maxlength: 15,
    minlength: 10,
  },
  nameRequester: {
    type: String,
  },
  cellphone: {
    type: String,
    minlength: 10,
  },
  telephone: {
    type: String,
    minlength: 10,
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address.`,
    },
  },
  direction: {
    type: String,
  },
  postalCode: {
    type: Number,
    minlength: 5,
  },
  street: {
    type: String,
  },
  colony: {
    type: String,
  },
  publicType: {
    type: String,
  },
  chairNumber: {
    type: Number,
  },
  specificDescription: {
    type: String,
    minlength: 300,
  },
  assistance: {
    type: Number,
  },
  ages: {
    type: String,
  },
  requiredSpace: {
    type: String,
  },
  equipment: {
    type: String,
  },
  selfEquipment: {
    type: String,
  },
  softInstallation: {
    type: String,
  },
  mounting: {
    type: String,
  },
  tableNumber: {
    type: Number,
  },
  electricInstallation: {
    type: String,
  },
  folio: {
    type: String,
  },
});

/**
 * Defines a model for the form document.
 *
 * The model provides an interface for accessing and manipulating form documents in the database.
 * The model is created by passing the schema to the mongoose.model function.
 * The first argument is the name of the collection that will store the form documents.
 * The second argument is the schema for the form document.
 */
const Form = mongoose.model("Form", FormSchema);

export default Form;
