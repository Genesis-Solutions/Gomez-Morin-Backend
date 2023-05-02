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
    status: {
        type: String,
    },
    ptrEvent: {
        type: Schema.Types.ObjectId,
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
        maxlength: 12,
        minlength: 12,
    },
    startTime: {
        type: String,
        maxlength: 5,
        minlength: 5,
    },
    endDay: {
        type: String,
        maxlength: 12,
        minlength: 12,
    },
    endTime: {
        type: String,
        maxlength: 5,
        minlength: 5,
    },
    openingDay: {
        type: Boolean,
    },
    authorities: {
        type: String,
    },
    place: {
        type: String,
    },
    cost: {
        type: Boolean,
    },
    fee: {
        type: Number,
    },
    socialNetwork: {
        type: String,
    },
    sign: {
        type: Boolean,
    },
    urlDocs: {
        type: String,
        validate: {
            validator: function(v) {
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
        maxlength: 12,
        minlength: 12,
    },
    nameRequester: {
        type: String,
    },
    cellphone: {
        type: String,
        maxlength: 10,
        minlength: 10,
    },
    phoneEmergency: {
        type: String,
        maxlength: 10,
        minlength: 10,
    },
    email: {
        type: String,
        validate: {
            validator: function(v) {
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
        maxlength: 5,
        minlength: 5,
    },
    street: {
        type: String,
    },
    colony: {
        type: String,
    },
    publicEvent: {
        type: Boolean,
    },
    chairNumber: {
        type: Number,
    },
    specificDescription: {
        type: String,
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