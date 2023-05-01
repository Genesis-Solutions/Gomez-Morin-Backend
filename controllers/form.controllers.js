import Security from "../securityUtils/security.js";
const formModel = require('../models/form.model.js');

exports.uploadForm = (req, res) => {
    const encryptFileName = Security.encryptFileName(req.files[0].filename)
    console.log("Encripted", encryptFileName)
    console.log("myFormName", req.body.name)
}

exports.getForm = (req, res) => {
    const decryptFileName = Security.decryptFileName(req.params.name)
    console.log("Decripted", decryptFileName);
}