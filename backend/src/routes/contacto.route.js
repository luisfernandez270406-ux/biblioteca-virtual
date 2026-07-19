const express = require("express");

const router = express.Router();
const {enviarMensaje} = require("../controllers/contacto.controller")
const upload = require("../middleware/upload");

router.post("/",upload.single("archivo"),enviarMensaje);

module.exports = router;