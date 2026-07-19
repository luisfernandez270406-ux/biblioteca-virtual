const express = require("express");

const router = express.Router();

const {
    crearUsuarioPrueba
} = require("../controllers/usuarios.controller");

router.post("/prueba", crearUsuarioPrueba);

module.exports = router;