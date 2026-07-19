const express = require("express");

const router = express.Router();

const verificarToken = require("../middleware/verificarToken");
const {agregarFavorito} = require("../controllers/favoritos.controller")

router.post("/", verificarToken, agregarFavorito)




module.exports = router;