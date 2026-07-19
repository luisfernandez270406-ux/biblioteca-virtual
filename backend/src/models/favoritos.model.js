const mongoose = require("mongoose");

const favoritoSchema = new mongoose.Schema({

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    libroId: {

        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },

    autor: {
        type: String,
        required: true

    },
    portada: {
        type: String,
        default: ""

    }

}, {

    timestamps: true

});

module.exports = mongoose.model("Favorito", favoritoSchema);