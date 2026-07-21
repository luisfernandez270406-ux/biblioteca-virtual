const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "login.html";
}
const usuario = JSON.parse(localStorage.getItem("usuario"));
document.getElementById("nombreUsuario").textContent =
    usuario.nombreUsuario;
const botonUsuario = document.querySelector(".navbar__usuarioToggle");
const menu = document.querySelector(".navbar__dropdown");

botonUsuario.addEventListener("click", () => {
    menu.classList.toggle("activo");
});


const btnCerrarSesion =
document.getElementById("btnCerrarSesion");

btnCerrarSesion.addEventListener("click", cerrarSesion);
function cerrarSesion() {

    localStorage.removeItem("token"); //borramos el token 

    localStorage.removeItem("usuario");

    window.location.href = "login.html";

}