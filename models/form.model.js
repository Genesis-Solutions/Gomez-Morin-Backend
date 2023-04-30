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
        required: true,
    },
    ptrRequest: {
        type: Schema.Types.ObjectId,
    },
    ptrEvent: {
        type: Schema.Types.ObjectId,
    },
    typeEvent: {
        type: String,
        required: true,
    },
    nameEvent: {
        type: String,
        required: true,
    },
    targetAudience: {
        type: String,
        required: true,
    },
    startDay: {
        type: String,
        required: true,
        maxlength: 12,
        minlength: 12,
    },
    startTime: {
        type: String,
        required: true,
        maxlength: 5,
        minlength: 5,
    },
    endDay: {
        type: String,
        required: true,
        maxlength: 12,
        minlength: 12,
    },
    endTime: {
        type: String,
        required: true,
        maxlength: 5,
        minlength: 5,
    },
    openingDay: {
        type: Boolean,
        required: true,
    },
    authorities: {
        type: String,
    },
    place: {
        type: String,
        required: true,
    },
    cost: {
        type: Boolean,
        required: true,
    },
    fee: {
        type: Number,
    },
    socialNetwork: {
        type: String,
    },
    sign: {
        type: Boolean,
        required: true,
    },
    urlDocs: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\.pdf$/.test(v);
            },
            message: (props) => `${props.value} is not a valid PDF file.`,
        },
    },
    requestDate: {
        type: String,
        required: true,
        maxlength: 12,
        minlength: 12,
    },
    nameRequester: {
        type: String,
        required: true,
    },
    cellphone: {
        type: String,
        required: true,
        maxlength: 10,
        minlength: 10,
    },
    phoneEmergency: {
        type: String,
        required: true,
        maxlength: 10,
        minlength: 10,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email address.`,
        },
    },
    direction: {
        type: String,
        required: true,
    },
    postalCode: {
        type: Number,
        required: true,
        maxlength: 5,
        minlength: 5,
    },
    street: {
        type: String,
        required: true,
    },
    colony: {
        type: String,
        required: true,
    },
    publicEvent: {
        type: Boolean,
    },
    chairNumber: {
        type: Number,
        required: true,
    },
    specificDescription: {
        type: String,
        required: true,
        minlength: 50,
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
        type: Boolean,
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
    openingDayDate: {
        type: String,
        maxlength: 12,
        minlength: 12,
    },
    openingDayTime: {
        type: String,
        maxlength: 5,
        minlength: 5,
    },
    sound: {
        type: Boolean,
    },
    microphone: {
        type: Boolean,
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