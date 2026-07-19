const express = require("express");
const cors = require("cors");

const app = express();

const testRoutes = require("./routes/test.route");
const UsuariosRoutes = require("./routes/usuarios.route")

app.use("/api/test", testRoutes);
app.use("/api/usuarios", UsuariosRoutes);

app.use(cors());
app.use(express.json());




module.exports = app;