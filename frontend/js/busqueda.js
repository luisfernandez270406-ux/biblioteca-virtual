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