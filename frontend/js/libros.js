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
function mostrarLibros(libros){
    const contenedor = document.getElementById("contenedorLibros");
    contenedor.innerHTML = "";
    libros.forEach(libro => {
        contenedor.innerHTML += crearTarjeta(libro);
    });
}
async function buscarLibros(busqueda,startIndex = 0,orderBy = "relevance") {
    const respuesta = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${busqueda}&maxResults=14&startIndex=${startIndex}&orderBy=${orderBy}&key=AIzaSyCCBbzjpNC-4rG4Lvti2YUnocS9Q4uEt0w`
    );
    const datos = await respuesta.json();
    if (!respuesta.ok) {
        console.error(datos.error.message);
        return;
    }
    mostrarLibros(datos.items || []);
    return datos;
}
