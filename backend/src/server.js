const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);// solucion temporal error conexion
require("dotenv").config();

const app = require("./app");
const conectarDB = require("./config/database");

const PORT = process.env.PORT || 3000;

conectarDB();

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});