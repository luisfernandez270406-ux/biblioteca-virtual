const Contacto = require("../models/contacto.model");

const enviarMensaje = async (req, res) => {
    try {
        const {
            nombre,
            telefono,
            correo,
            tipoSolicitud,
            mensaje
        } = req.body;
        if (!nombre ||!telefono ||!correo ||!tipoSolicitud ||!mensaje) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios."
            });
        }
        const nuevoContacto = await Contacto.create({
            nombre,
            telefono,
            correo,
            tipoSolicitud,
            mensaje,
            archivo: req.file ? req.file.path : ""
        });
        res.status(201).json({
            mensaje: "Solicitud enviada correctamente.",
            contacto: nuevoContacto
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error interno del servidor."
        });
    }
};

module.exports = {enviarMensaje};