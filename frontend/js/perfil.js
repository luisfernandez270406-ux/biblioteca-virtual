const usuario = JSON.parse(localStorage.getItem("usuario"));
if(usuario){
document.getElementById("nombreUsuario").textContent =
    usuario.nombreUsuario;
 }
const botonUsuario = document.querySelector(".navbar__usuarioToggle");
const menu = document.querySelector(".navbar__dropdown");
//menu usuario
botonUsuario.addEventListener("click", () => {
    menu.classList.toggle("activo");
});
document.addEventListener("click", (evento) => {

    if (
        !botonUsuario.contains(evento.target) &&
        !menu.contains(evento.target)
    ) {
        menu.classList.remove("activo");
    }

});


const btnCerrarSesion =
document.getElementById("btnCerrarSesion");

btnCerrarSesion.addEventListener("click", cerrarSesion);
function cerrarSesion() {

    localStorage.removeItem("token"); //borramos el token 

    localStorage.removeItem("usuario");

    window.location.href = "login.html";

}



document.addEventListener("DOMContentLoaded", async () => {

    const usuarioString = localStorage.getItem("usuario");
    
    if (usuarioString) {
        const usuario = JSON.parse(usuarioString);
        
        const spanNombreNav = document.getElementById("nombreUsuario");
        if (spanNombreNav) spanNombreNav.textContent = usuario.nombreUsuario || "Usuario";

        const spanNombreCompleto = document.getElementById("nombreCompleto");
        if (spanNombreCompleto) spanNombreCompleto.textContent = usuario.nombreUsuario || "Sin nombre";

        const spanCorreo = document.getElementById("correo");
        if (spanCorreo) spanCorreo.textContent = usuario.correo || usuario.email || "No disponible";

        const spanFecha = document.getElementById("fechaRegistro");
            if (spanFecha) {
        const fechaCruda = usuario.createdAt; // O la propiedad que traiga tu base de datos
            if (fechaCruda) {
        const fecha = new Date(fechaCruda);
            spanFecha.textContent = fecha.toLocaleDateString(); // Esto la convierte al formato local legible
        } else {
        spanFecha.textContent = "No disponible";
        }
    }
        const spanRol = document.getElementById("rol");
        if (spanRol) {
            spanRol.textContent = usuario.rol || "Lector";
        }
    }
    await cargarConteoFavoritos();
    configurarCerrarSesion();
});

async function cargarConteoFavoritos() {
    try {
        const token = localStorage.getItem("token");
        const respuesta = await fetch("http://localhost:3000/api/favoritos", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const datos = await respuesta.json();
        
        const spanCantidadFavs = document.getElementById("cantidadFavoritos");
        if (spanCantidadFavs && datos.favoritos) {
            spanCantidadFavs.textContent = datos.favoritos.length;
        } else if (spanCantidadFavs) {
            spanCantidadFavs.textContent = "0";
        }
    } catch (error) {
        console.error("Error al obtener el conteo de favoritos:", error);
        const spanCantidadFavs = document.getElementById("cantidadFavoritos");
        if (spanCantidadFavs) spanCantidadFavs.textContent = "0";
    }
}

function configurarCerrarSesion() {
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", ejecutarCerrarSesion);
    }
}

function ejecutarCerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "login.html";
}
