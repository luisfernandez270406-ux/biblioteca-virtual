
async function obtenerLibro(idLibro) {
    const respuesta = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${idLibro}?key=AIzaSyCCBbzjpNC-4rG4Lvti2YUnocS9Q4uEt0w`
    );

    const libro = await respuesta.json();

    if (!respuesta.ok) {
        console.error(libro.error.message);
        return;
    }
    console.log(libro)
    mostrarLibro(libro);
}
function mostrarLibro(libro) {
    const info = libro.volumeInfo;
    const sinopsisLimpia = info.description 
    ? info.description.replace(/<\/?[^>]+(>|$)/g, "") 
    : "Sinopsis no disponible";
    document.getElementById("tituloLibro").textContent =
        info.title || "Título no disponible";
    document.getElementById("autorLibro").textContent =
        info.authors?.join(", ") || "Autor desconocido";
    document.getElementById("portadaLibro").src =
        info.imageLinks?.thumbnail || "../assets/imagenes/sinPortada.png";
    document.getElementById("categoriasLibro").textContent =
        info.categories?.join(", ") || "Categoría no disponible";
    document.getElementById("editorialLibro").textContent = 
        info.publisher || "Editorial no disponible";
    document.getElementById("paginasLibro").textContent =
        info.pageCount || "No disponible";
    document.getElementById("fechaPublicacion").textContent = 
        info.publishedDate || "No fecha disponible";
    document.getElementById("idiomaLibro").textContent =
        info.language || "No disponible";
    document.getElementById("sinopsisLibro").textContent = 
        sinopsisLimpia;
    const contenedorCompra = document.getElementById("contenedorCompra");
    const enlaceCompra = libro.saleInfo?.buyLink;
    const enlacePreview = info.previewLink;
    let htmlBotones = "";
   if (enlaceCompra) {
    htmlBotones += `
        <a href="${enlaceCompra}" target="_blank" rel="noopener noreferrer" class="btn-comprar">
            Comprar libro
        </a>
    `;
    }
    if (enlacePreview) {
        htmlBotones += `
        <a href="${enlacePreview}" target="_blank" rel="noopener noreferrer" class="btn-preview">
            Vista previa
        </a>
    `;
    }
    contenedorCompra.innerHTML = htmlBotones;
}
const parametros = new URLSearchParams(window.location.search);
const idLibro = parametros.get("id");
console.log(idLibro);
obtenerLibro(idLibro);