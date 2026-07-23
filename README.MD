# E-Biblioteca

Sistema web de biblioteca virtual desarrollado como proyecto académico para la asignatura de Desarrollo Web.

La aplicación permite a los usuarios registrarse, iniciar sesión, explorar libros mediante la API de Google Books, consultar información detallada de cada libro, administrar una lista de favoritos almacenada en MongoDB y enviar solicitudes mediante un formulario de contacto.

---
# Características

- Registro de usuarios.
- Inicio y cierre de sesión mediante JWT.
- Perfil de usuario.
- Búsqueda de libros utilizando Google Books API.
- Resultados con paginación.
- Búsqueda por categorías.
- Visualización detallada de cada libro.
- Agregar y eliminar libros favoritos.
- Persistencia de favoritos en MongoDB Atlas.
- Formulario de contacto.
- Loader de carga y manejo de errores de conexión.
- Diseño responsive.

---
# Tecnologías utilizadas

## Frontend

- HTML5
- CSS3
- JavaScript (ES6)

## Backend

- Node.js
- Express.js

## Base de datos

- MongoDB Atlas
- Mongoose

## Seguridad

- JSON Web Token (JWT)
- bcrypt

## API Externa

- Google Books API

---

# Estructura del proyecto

```
biblioteca-virtual/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   ├── app.js
│   └── package.json
│
├── frontend/
│   ├── assets/
│   ├── css/
│   ├── js/
│   └── pages/
│
└── README.md
```

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/TU-USUARIO/biblioteca-virtual.git
```

---

## 2. Instalar dependencias

Entrar en la carpeta backend.

```bash
cd backend
npm install
```

---

## 3. Configurar variables de entorno

Crear un archivo `.env` dentro de `backend`.

Ejemplo:

```env
PORT=3000

MONGODB_URI=tu_uri_de_mongodb

JWT_SECRET=tu_clave_secreta
```

---

## 4. Iniciar el servidor

```bash
npm start
```

El servidor quedará disponible en:

```
http://localhost:3000
```

---

# API utilizada

La información de los libros es obtenida mediante:

Google Books API

---

# Funcionalidades principales

## Autenticación

- Registro de usuarios
- Inicio de sesión
- Protección de rutas mediante JWT

## Biblioteca

- Buscar libros
- Buscar por categorías
- Paginación
- Información completa del libro

## Favoritos

- Agregar favoritos
- Eliminar favoritos
- Persistencia en MongoDB

## Perfil

- Visualización de la información del usuario

## Contacto

- Envío de solicitudes
- Subida de archivos

---

