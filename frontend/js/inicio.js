const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "login.html";
}
const usuario = JSON.parse(localStorage.getItem("usuario"));
if(usuario){
document.getElementById("nombreUsuario").textContent =
    usuario.nombreUsuario;
 }

const categoriasInicio = [
    "subject:fiction",
    "subject:fantasy",
    "subject:romance",
    "subject:science",
    "subject:technology",
    "subject:history"
];
let categoriaInicio =
sessionStorage.getItem("categoria_inicio");
if (!categoriaInicio) {

    categoriaInicio =
    categoriasInicio[
        Math.floor(Math.random() * categoriasInicio.length)
    ];

    sessionStorage.setItem(
        "categoria_inicio",
        categoriaInicio
    );

}
const botonUsuario = document.querySelector(".navbar__usuarioToggle");
const inputBuscador = document.getElementById("buscador");
const btnBuscar = document.getElementById("btnBuscar");
const menu = document.querySelector(".navbar__dropdown");
const btnVerTodosLibros = document.getElementById("btnVerTodosLibros");

btnBuscar.addEventListener("click", buscar);
inputBuscador.addEventListener("keydown", (evento) => {

    if (evento.key === "Enter") {
        buscar();
    }

});
btnVerTodosLibros.addEventListener("click", verTodos);


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

function buscar() {
    const texto = inputBuscador.value.trim();
    if (texto === "") {
        return;
    }
    window.location.href =
    `busqueda.html?q=${encodeURIComponent(texto)}`;
}

function verTodos() {
    const categoria =
    sessionStorage.getItem("categoria_inicio");
    window.location.href =
    `busqueda.html?q=${encodeURIComponent(categoria)}`;
}


buscarLibros(categoriaInicio);
