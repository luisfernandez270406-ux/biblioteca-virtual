const express = require("express");

const router = express.Router();

const verificarToken = require("../middleware/verificarToken");
const {agregarFavoritos,obtenerFavoritos,eliminarFavoritos,verificarFavorito} = require("../controllers/favoritos.controller")

router.post("/", verificarToken, agregarFavoritos)
router.get("/", verificarToken, obtenerFavoritos)
router.delete("/:id", verificarToken, eliminarFavoritos)
router.get("/existe/:libroId",verificarToken,verificarFavorito);




module.exports = router;