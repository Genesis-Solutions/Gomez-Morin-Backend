import express from "express";
import { formController } from "../controllers/form.controllers.js";
import encrypting from "../middlewares/encrypting.js"
const router = express.Router();

router.post("/solicitud", encrypting.encrypt, formController.createForm);

module.exports = router