const express = require("express");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/auth.route");
const UsuariosRoutes = require("./routes/usuarios.route")
const favoritosRoutes = require("./routes/favoritos.route")
const contactoRoutes = require("./routes/contacto.route")

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", UsuariosRoutes);
app.use("/api/favoritos", favoritosRoutes);
app.use("/api/contacto", contactoRoutes);
app.use("/uploads", express.static("uploads"));

app.use(cors());
app.use(express.json());




module.exports = app;