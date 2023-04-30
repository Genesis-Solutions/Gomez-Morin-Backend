/**
 * This module imports the Mongoose library and defines a schema and a model for a form document.
 * The form document represents a user-submitted form for event planning and includes various fields
 * for event details, contact information, equipment requirements, and other specifications.
 */

import mongoose, { Schema } from "mongoose";

/**
 * Defines the schema for a form document.
 * The schema specifies the data types, validation rules, and other properties for each field in the form.
 * Each field corresponds to a key-value pair in a form document.
 */

const FormSchema = new mongoose.Schema({
    idForm: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    ptrSolicitud: {
        type: Schema.Types.ObjectId,
    },
    ptrEvento: {
        type: Schema.Types.ObjectId,
    },
    tipoEvento: {
        type: String,
        required: true,
    },
    nombreEvento: {
        type: String,
        required: true,
    },
    descripcionGeneral: {
        type: String,
        required: true,
        maxlength: 150,
    },
    publicoObjetivo: {
        type: String,
        required: true,
    },
    diaInicio: {
        type: String,
        required: true,
        maxlength: 10,
        minlength: 10,
    },
    horaInicio: {
        type: String,
        required: true,
        maxlength: 5,
        minlength: 5,
    },
    diaFinal: {
        type: String,
        required: true,
        maxlength: 10,
        minlength: 10,
    },
    horaFinal: {
        type: String,
        required: true,
        maxlength: 5,
        minlength: 5,
    },
    inauguracion: {
        type: Boolean,
        required: true,
    },
    autoridades: {
        type: String,
    },
    lugar: {
        type: String,
        required: true,
    },
    costo: {
        type: Boolean,
        required: true,
    },
    cuota: {
        type: Number,
    },
    contacto: {
        type: String,
        required: true,
    },
    informesTel: {
        type: Number,
        required: true,
        maxlength: 10,
        minlength: 10,
    },
    informesCorreo: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email address.`,
        },
    },
    redesSociales: {
        type: String,
    },
    firma: {
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
    fechaSolicitud: {
        type: String,
        required: true,
        maxlength: 10,
        minlength: 10,
    },
    nombreSolicitante: {
        type: String,
        required: true,
    },
    telefonoCelular: {
        type: Number,
        required: true,
        maxlength: 10,
        minlength: 10,
    },
    telefonoEmergencia: {
        type: Number,
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
    direccion: {
        type: String,
        required: true,
    },
    codigoPostal: {
        type: Number,
        required: true,
        maxlength: 5,
        minlength: 5,
    },
    calle: {
        type: String,
        required: true,
    },
    colonia: {
        type: String,
        required: true,
    },
    eventoPublico: {
        type: Boolean,
    },
    numSillas: {
        type: Number,
        required: true,
    },
    descripcionEspecífica: {
        type: String,
        required: true,
        maxlength: 150,
        minlength: 30,
    },
    asistentes: {
        type: Number,
    },
    edades: {
        type: String,
    },
    espacioRequerido: {
        type: String,
    },
    equipo: {
        type: String,
    },
    equipoPropio: {
        type: Boolean,
    },
    instalacionSoft: {
        type: String,
    },
    montaje: {
        type: String,
    },
    numMesas: {
        type: Number,
    },
    fechaInauguracion: {
        type: String,
        maxlength: 10,
        minlength: 10,
    },
    horaInauguracion: {
        type: String,
        maxlength: 5,
        minlength: 5,
    },
    sonido: {
        type: Boolean,
    },
    microfono: {
        type: Boolean,
    },
});

/**

* Defines a model for the form document.
* The model provides an interface for accessing and manipulating form documents in the database.
* The model is created by passing the schema to the mongoose.model function.
* The first argument is the name of the collection that will store the form documents.
* The second argument is the schema for the form document.
*/

const Form = mongoose.model("Form", FormSchema);

export default Form;