const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
    {
        nombreCompleto: {
            type: String,
            required: true,
            trim: true
        },

        nombreUsuario: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        correo: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        password: {
            type: String,
            required: true
        },

        rol: {
            type: String,
            default: "cliente"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Usuario", usuarioSchema);