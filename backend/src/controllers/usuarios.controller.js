const Usuario = require("../models/usuarios.model");

const crearUsuarioPrueba = async (req, res) => {

    try {

        const usuario = await Usuario.create({

            nombre: "Luis",

            correo: "luis@gmail.com",

            password: "123456",

            rol: "cliente"

        });

        res.status(201).json(usuario);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

module.exports = {
    crearUsuarioPrueba
};