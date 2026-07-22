const formulario = document.getElementById("formLogin");
const mensaje = document.getElementById("mensajeLogin");

const token = localStorage.getItem("token");
if (token) {
    window.location.href = "inicio.html"; 
}
formulario.addEventListener("submit", iniciarSesion);

async function iniciarSesion(evento) {
    
    try { 
    evento.preventDefault();
    mensaje.textContent = "";
    const nombreUsuario = document.getElementById("nombreUsuario").value;
    const password = document.getElementById("password").value;
    const respuesta = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            identificador: nombreUsuario,
            password
        })
    });
    const datos = await respuesta.json();
    if (!respuesta.ok) {
        mensaje.textContent = datos.mensaje;
        mensaje.style.color = "red";
        console.log(datos.mensaje);
        return;
    }
    console.log(datos);
    localStorage.setItem("token", datos.token);
    localStorage.setItem("usuario",JSON.stringify(datos.usuario));
    window.location.href = "inicio.html";
   }
   catch(error) {
    mensaje.textContent ="No se pudo conectar con el servidor.";
    mensaje.style.color = "red";
    }
}
