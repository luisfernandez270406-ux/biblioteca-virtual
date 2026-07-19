const Usuario = require("../models/usuarios.model");

const obtenerPerfil = async (req, res) => {

    try {
        const usuario = await Usuario.findById(req.usuario.id);
        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado."
            });
        }
        res.status(200).json({
            usuario: {
                id: usuario._id,
                nombreCompleto: usuario.nombreCompleto,
                nombreUsuario: usuario.nombreUsuario,
                correo: usuario.correo,
                rol: usuario.rol,
                createdAt: usuario.createdAt
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error interno del servidor."
        });
    }
};

module.exports = {obtenerPerfil};