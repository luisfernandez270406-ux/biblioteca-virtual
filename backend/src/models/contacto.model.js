const mongoose = require("mongoose");

const contactoSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        trim: true
    },
    correo: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    tipoSolicitud: {
        type: String,
        required: true,
        enum: [
            "consulta",
            "reporte",
            "sugerencia"
        ]
    },
    mensaje: {
        type: String,
        required: true,
        trim: true
    },
    archivo: {
        type: String,
        default: ""
    },
    estado: {
        type: String,
        enum: [
            "Pendiente",
            "Respondido"
            ],
        default: "Pendiente"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Contacto", contactoSchema);