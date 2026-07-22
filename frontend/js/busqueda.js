const token = localStorage.getItem("token");// protegemos la ruta 

if (!token) {
    window.location.href = "login.html";
}
const usuario = JSON.parse(localStorage.getItem("usuario"));// mostramos username
if (usuario) {
    document.getElementById("nombreUsuario").textContent =
    usuario.nombreUsuario;
}
//parametros de url
const parametros = new URLSearchParams(window.location.search);
const busqueda = parametros.get("q");
// elementos del dom
const formulario = document.getElementById("formBuscar");
const inputBuscador = document.getElementById("buscador");
const btnBuscar = document.getElementById("btnBuscar");
async function cargarBusqueda() {
    console.log(busqueda);
    const datos = await buscarLibros(busqueda);
    document.getElementById("cantidadResultados").textContent =
    datos.totalItems;
}
function buscar() {
    const texto = inputBuscador.value.trim();
    if (texto === "") {
        return;
    }
    console.log(texto);
    window.location.href = `busqueda.html?q=${encodeURIComponent(texto)}`;
}

//eventListeners
formulario.addEventListener("submit", (evento) => {
    console.log("Entré al submit");
    evento.preventDefault();
    buscar();
});

document.getElementById("terminoBusqueda").textContent =
busqueda;// escribir texto en busquedaCabecera
 
inputBuscador.value = busqueda;// mostrar la busqueda 

cargarBusqueda();
