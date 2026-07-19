const express = require("express");

const router = express.Router();

const verificarToken = require("../middleware/verificarToken");
const {obtenerPerfil} = require("../controllers/usuarios.controller");


router.get("/perfil", verificarToken, obtenerPerfil);

module.exports = router;