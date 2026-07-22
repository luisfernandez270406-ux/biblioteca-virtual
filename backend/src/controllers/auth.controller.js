const Usuario = require("../models/usuarios.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registrar = async (req, res) => {
    try {
        const {
            nombreCompleto,
            nombreUsuario,
            correo,
            password
        } = req.body;
        if (!nombreCompleto ||!nombreUsuario ||!correo ||!password) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios."});

        }
        const correoExistente = await Usuario.findOne({
            correo
        });
        if (correoExistente) {
           return res.status(409).json({
            mensaje: "El correo ya está registrado."
            });
         }
         const usuarioExistente = await Usuario.findOne({
            nombreUsuario
        });
        if (usuarioExistente) {
            return res.status(409).json({
            mensaje: "El nombre de usuario ya está en uso."
        });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const nuevoUsuario = await Usuario.create({
            nombreCompleto,
            nombreUsuario,
            correo,
            password: passwordHash
        });
        res.status(201).json({
            mensaje: "Usuario registrado correctamente.",
            usuario: {
            id: nuevoUsuario._id,
            nombreCompleto: nuevoUsuario.nombreCompleto,
            nombreUsuario: nuevoUsuario.nombreUsuario,
            correo: nuevoUsuario.correo,
            rol: nuevoUsuario.rol,
            createdAt: nuevoUsuario.createdAt
    }

});
    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error interno del servidor."
        });

    }

};

const iniciarSesion = async (req, res) => {

    try {
        const {
            identificador,
            password
        } = req.body;
        if (!identificador || !password) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios."
            });
        }
        const usuario = await Usuario.findOne({
            $or: [
                { correo: identificador },
                { nombreUsuario: identificador }
            ]
        });
        if (!usuario) {
            return res.status(401).json({
                mensaje: "El nombre de usuario o contrasena es incorrectas"
            });
        }
        const passwordCorrecta = await bcrypt.compare(
            password,
            usuario.password
        );
        if (!passwordCorrecta) {
            return res.status(401).json({
                mensaje: "El nombre de usuario o contrasena es incorrectas"
            });
        }
        const token = jwt.sign(
            {
                id: usuario._id,
                nombreUsuario: usuario.nombreUsuario,
                rol: usuario.rol,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );
        res.status(200).json({
            mensaje: "Inicio de sesión exitoso.",
            token,
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



module.exports = {
    registrar,
    iniciarSesion
};