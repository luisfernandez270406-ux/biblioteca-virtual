const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/");

    },

    filename: (req, file, cb) => {

        const nombreArchivo =
            "contacto-" +
            Date.now() +
            path.extname(file.originalname);
        cb(null, nombreArchivo);

    }

});
const fileFilter = (req, file, cb) => {
    const tiposPermitidos = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf"
    ];
    if (tiposPermitidos.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Tipo de archivo no permitido."));
    }
};
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = upload;