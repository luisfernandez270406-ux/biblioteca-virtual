const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.json({
        mensaje: "La API funciona correctamente."
    });

});

module.exports = router;