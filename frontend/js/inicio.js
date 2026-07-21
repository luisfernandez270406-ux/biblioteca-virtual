const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "login.html";
}
const usuario = JSON.parse(localStorage.getItem("usuario"));
if(usuario){
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
// prueba api de google
async function cargarLibros() {

    const respuesta = await fetch(
        "https://www.googleapis.com/books/v1/volumes?q=programming&maxResults=20&key=AIzaSyCCBbzjpNC-4rG4Lvti2YUnocS9Q4uEt0w"
    );
    console.log(respuesta);

    const datos = await respuesta.json();
    console.log(datos);
    if (!respuesta.ok) {
    console.error(datos.error.message);
    return;
}

    mostrarLibros(datos.items);

}

function mostrarLibros(libros){
    const contenedor = document.getElementById("contenedorLibros");
    contenedor.innerHTML = "";
    libros.forEach(libro => {
        contenedor.innerHTML += crearTarjeta(libro);
    });
}

function crearTarjeta(libro){
    const titulo = libro.volumeInfo.title;
    const autor = libro.volumeInfo.authors?.join(", ") || "Autor desconocido";
    const portada = libro.volumeInfo.imageLinks?.thumbnail || "../assets/imagenes/sinPortada.png";
    return `
        <div class="libroCard">
            <img
                class="libroCard__portada"
                src="${portada}"
                alt="${titulo}"
            >
            <h3 class="libroCard__titulo">
                ${titulo}
            </h3>
            <p class="libroCard__autor">
                ${autor}
            </p>
        </div>
    `;
}



cargarLibros();
