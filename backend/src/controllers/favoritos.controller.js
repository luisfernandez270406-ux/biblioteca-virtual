const Favorito = require("../models/favoritos.model");

const agregarFavoritos = async (req, res) => {

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

const obtenerFavoritos = async (req, res) => {

    try {
        const favoritos = await Favorito.find({
            usuario: req.usuario.id
        });
        res.status(200).json({
            favoritos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error interno del servidor."
        });
    }
};
const eliminarFavoritos = async (req, res) => {

    try {
        const { id } = req.params;
        const favoritoEliminado = await Favorito.findOneAndDelete({
            _id: id,
            usuario: req.usuario.id
        });
        if (!favoritoEliminado) {
            return res.status(404).json({
                mensaje: "Favorito no encontrado."
            });
           }
            res.status(200).json({
            mensaje: "Favorito eliminado correctamente."
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error interno del servidor."
        });
    }
};

module.exports = {agregarFavoritos,obtenerFavoritos,eliminarFavoritos};