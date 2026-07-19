const Favorito = require("../models/favoritos.model");

const agregarFavorito = async (req, res) => {

    try {
        const {
            libroId,
            titulo,
            autor,
            portada
        } = req.body;
        if (!libroId || !titulo || !autor) {
            return res.status(400).json({
            mensaje: "Todos los campos son obligatorios."});        
        }
        const favoritoExistente = await Favorito.findOne({
            usuario: req.usuario.id,
            libroId
        });
        if (favoritoExistente) {
        return res.status(409).json({
            mensaje: "Este libro ya está en favoritos."});
        }
        const nuevoFavorito = await Favorito.create({
            usuario: req.usuario.id,
            libroId,
            titulo,
            autor,
            portada
        });
        res.status(201).json({
            mensaje: "Libro agregado a favoritos.",
            favorito: nuevoFavorito
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error interno del servidor."
        });

    }

};

module.exports = {agregarFavorito};