let listaFavoritosGlobal = [];

const usuario = JSON.parse(localStorage.getItem("usuario"));
if(usuario){
    document.getElementById("nombreUsuario").textContent = usuario.nombreUsuario;
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

const btnCerrarSesion = document.getElementById("btnCerrarSesion");
btnCerrarSesion.addEventListener("click", cerrarSesion);
function cerrarSesion() {
    localStorage.removeItem("token"); 
    localStorage.removeItem("usuario");
    window.location.href = "login.html";
}

async function cargarFavoritos() {
    const token = localStorage.getItem("token");

    try {
        const respuesta = await fetch(
            "http://localhost:3000/api/favoritos",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const datos = await respuesta.json();
        console.log(datos);

        if (datos.favoritos) {
            listaFavoritosGlobal = datos.favoritos;
            
            const spanContador = document.getElementById("cantidadFavoritos");
            if (spanContador) spanContador.textContent = listaFavoritosGlobal.length;

            renderizarFavoritos(listaFavoritosGlobal);
        }
    } catch (error) {
        console.error("Error al cargar favoritos:", error);
    }
}

function renderizarFavoritos(favoritosArray) {
    const contenedor = document.getElementById("contenedorFavoritos");
    const favoritosVacio = document.getElementById("favoritosVacio");
    const spanContador = document.getElementById("cantidadFavoritos");

    contenedor.innerHTML = "";
    
    if (spanContador) spanContador.textContent = favoritosArray.length;

    if (favoritosArray.length > 0) {
        if (favoritosVacio) favoritosVacio.style.display = "none";

        favoritosArray.forEach(favorito => {
            contenedor.innerHTML += crearTarjetaFavorito(favorito);
        });
    } else {
        if (favoritosVacio) favoritosVacio.style.display = "block";
    }
}

function crearTarjetaFavorito(favorito) {
    return `
        <a href="libro-detalles.html?id=${favorito.libroId}" class="libroCard__enlace">
            <div class="libroCard">
                <img
                    class="libroCard__portada"
                    src="${favorito.portada || "../assets/imagenes/sinPortada.png"}"
                    alt="${favorito.titulo}"
                >

                <h3 class="libroCard__titulo">
                    ${favorito.titulo}
                </h3>

                <p class="libroCard__autor">
                    ${favorito.autor}
                </p>
            </div>
        </a>
    `;
}

const inputBuscador = document.getElementById("buscadorFavoritos");

if (inputBuscador) {
    inputBuscador.addEventListener("input", (e) => {
        const textoBusqueda = e.target.value.toLowerCase().trim();

        
        const favoritosFiltrados = listaFavoritosGlobal.filter(fav => {
            const tituloCoincide = fav.titulo && fav.titulo.toLowerCase().includes(textoBusqueda);
            const autorCoincide = fav.autor && fav.autor.toLowerCase().includes(textoBusqueda);
            return tituloCoincide || autorCoincide;
        });

        
        renderizarFavoritos(favoritosFiltrados);
    });
}


cargarFavoritos();