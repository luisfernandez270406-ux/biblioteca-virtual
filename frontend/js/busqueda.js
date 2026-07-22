const token = localStorage.getItem("token");// protegemos la ruta 

if (!token) {
    window.location.href = "login.html";
}
const usuario = JSON.parse(localStorage.getItem("usuario"));// mostramos username
if (usuario) {
    document.getElementById("nombreUsuario").textContent =
    usuario.nombreUsuario;
}

const botonUsuario = document.querySelector(".navbar__usuarioToggle");
const menu = document.querySelector(".navbar__dropdown");

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


//parametros de url
const parametros = new URLSearchParams(window.location.search);
const busqueda = parametros.get("q");
const pagina = Number(parametros.get("page")) || 1;
const librosPorPagina = 14;
const startIndex = (pagina - 1) * librosPorPagina;
// elementos del dom
const formulario = document.getElementById("formBuscar");
const inputBuscador = document.getElementById("buscador");
const btnBuscar = document.getElementById("btnBuscar");
async function cargarBusqueda() {
    console.log(busqueda);
    const datos = await buscarLibros(busqueda,startIndex);
    document.getElementById("cantidadResultados").textContent =
    datos.totalItems;
    crearPaginacion(datos.totalItems);
}
function crearPaginacion(totalResultados) {
    const contenedor =
    document.getElementById("paginacion");
    contenedor.innerHTML = "";
    const totalPaginas =
    Math.ceil(totalResultados / librosPorPagina);
    let inicio = Math.max(1, pagina - 2);
    let fin = Math.min(totalPaginas, pagina + 2);
    if (pagina > 1) {
    const btnAnterior =
    document.createElement("button");
    btnAnterior.textContent = "← Anterior";
    btnAnterior.addEventListener("click", () => {
     window.location.href =`busqueda.html?q=${encodeURIComponent(busqueda)}&page=${pagina - 1}`;});
    contenedor.appendChild(btnAnterior);
    }
    for (let i = inicio; i <= fin; i++) {
        const boton =
        document.createElement("button");
        boton.textContent = i;
        if (i === pagina) {
            boton.classList.add("activa");
        }
        boton.addEventListener("click", () => {
            window.location.href =
            `busqueda.html?q=${encodeURIComponent(busqueda)}&page=${i}`;
        });
        contenedor.appendChild(boton);
    }if (pagina < totalPaginas) {
    const btnSiguiente =
    document.createElement("button");
    btnSiguiente.textContent = "Siguiente →";
    btnSiguiente.addEventListener("click", () => {
        window.location.href =
        `busqueda.html?q=${encodeURIComponent(busqueda)}&page=${pagina + 1}`;
    });
    contenedor.appendChild(btnSiguiente);
}
}
function buscar() {
    const texto = inputBuscador.value.trim();
    if (texto === "") {
        return;
    }
    console.log(texto);
    window.location.href = `busqueda.html?q=${encodeURIComponent(texto)}`;
}
function obtenerNombreBusqueda(texto) {
    if (texto.startsWith("subject:")) {
        return texto.replace("subject:", "");
    }
    return texto;

}

//eventListeners
formulario.addEventListener("submit", (evento) => {
    console.log("Entré al submit");
    evento.preventDefault();
    buscar();
});

document.getElementById("terminoBusqueda").textContent =
obtenerNombreBusqueda(busqueda);// escribir texto en busquedaCabecera
 document.getElementById("terminoBusqueda").textContent = obtenerNombreBusqueda(busqueda || "");
inputBuscador.value = obtenerNombreBusqueda(busqueda || ""); 

cargarBusqueda();
