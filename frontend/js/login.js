const formulario = document.getElementById("formLogin"); // obtenemos el formulario
formulario.addEventListener("submit", iniciarSesion);

async function iniciarSesion(evento) {
    evento.preventDefault();
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
    console.log(datos);
    localStorage.setItem("token", datos.token);
    localStorage.setItem("usuario",JSON.stringify(datos.usuario));
    window.location.href = "inicio.html";
}

