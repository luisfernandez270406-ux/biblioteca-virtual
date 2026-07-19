const jwt = require("jsonwebtoken");
const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {

    return res.status(401).json({
        mensaje: "Token no proporcionado."
    });
    }
    if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
        mensaje: "Formato de token inválido."
    });
    }
    const token = authHeader.split(" ")[1]; //aqui seleccionas el token y omites el Bearer
    try {

    const payload = jwt.verify(
        token,
        process.env.JWT_SECRET
    );
    req.usuario = payload;
    next();

    } catch (error) {

    return res.status(401).json({
        mensaje: "Token inválido o expirado."
    });

    }
    


};

module.exports = verificarToken;