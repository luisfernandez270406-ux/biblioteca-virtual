const express = require("express");

const router = express.Router();
const {enviarMensaje} = require("../controllers/contacto.controller")

router.post("/",enviarMensaje);

module.exports = router;