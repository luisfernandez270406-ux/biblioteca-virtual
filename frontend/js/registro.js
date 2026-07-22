const formulario = document.getElementById("formRegistro");
const mensaje = document.getElementById("mensajeRegistro");

const token = localStorage.getItem("token"); // verificamos si hay sesión iniciada
if (token) {
    window.location.href = "inicio.html"; // evitamos que el usuario pueda volver al registro si ya tiene sesión activa
}

formulario.addEventListener("submit", registrarUsuario);

async function registrarUsuario(evento) {
    try {
        evento.preventDefault();
        mensaje.textContent = "";

        const nombreCompleto = document.getElementById("nombreCompleto").value.trim();
        const nombreUsuario = document.getElementById("nombreUsuario").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const password = document.getElementById("password").value.trim();

        const respuesta = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombreCompleto,
                nombreUsuario,
                correo,
                password
            })
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            mensaje.textContent = datos.mensaje;
            mensaje.style.color = "red";
            console.log(datos.mensaje);
            return; // esto detiene la función si hay un error
        }

        console.log(datos);
        mensaje.textContent = "¡Registro exitoso! Redirigiendo...";
        mensaje.style.color = "green";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);

    } catch (error) {
        console.error(error);
        mensaje.textContent = "No se pudo conectar con el servidor.";
        mensaje.style.color = "red";
    }
}