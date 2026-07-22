const express = require("express");

const router = express.Router();

const verificarToken = require("../middleware/verificarToken");
const {agregarFavoritos,obtenerFavoritos,eliminarFavoritos,verificarFavorito,eliminarFavoritoLibro} = require("../controllers/favoritos.controller")

router.post("/", verificarToken, agregarFavoritos)
router.get("/", verificarToken, obtenerFavoritos)
router.delete("/:id", verificarToken, eliminarFavoritos)
router.get("/existe/:libroId",verificarToken,verificarFavorito);
router.delete("/libro/:libroId", verificarToken, eliminarFavoritoLibro);




module.exports = router;