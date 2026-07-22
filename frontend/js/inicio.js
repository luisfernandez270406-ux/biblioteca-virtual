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
    "subject:ficcion",
    "subject:fantasia",
    "subject:romance",
    "subject:ciencia",
    "subject:technologia",
    "subject:historia"
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
const menu = document.querySelector(".navbar__dropdown");
const btnVerTodosLibros = document.getElementById("btnVerTodosLibros");
const formularioBuscar = document.getElementById("formBuscar");

formularioBuscar.addEventListener("submit", (evento) => {
    evento.preventDefault();
    buscar();
});

btnVerTodosLibros.addEventListener("click", verTodos);
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

function buscar() {
    const texto = inputBuscador.value.trim();
    if (texto === "") {
        return;
    }
    window.location.href =
    `busqueda.html?q=${encodeURIComponent(texto)}`;
}

function verTodos() {
    const categoria = sessionStorage.getItem("categoria_inicio");
    window.location.href = `busqueda.html?q=${encodeURIComponent(categoria)}`;
}

// Opciones directas y simples para cada categoría por su ID
document.getElementById("categoriaNovelas").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "busqueda.html?q=Novelas";
});

document.getElementById("categoriaTecnologia").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "busqueda.html?q=Tecnología";
});

document.getElementById("categoriaRomance").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "busqueda.html?q=Romance";
});

document.getElementById("categoriaCiencia").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "busqueda.html?q=Ciencia";
});

document.getElementById("categoriaTerror").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "busqueda.html?q=Terror";
});


buscarLibros(categoriaInicio);
