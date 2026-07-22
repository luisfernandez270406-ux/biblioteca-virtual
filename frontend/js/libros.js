function crearTarjeta(libro){
    const titulo = libro.volumeInfo.title;
    const autor = libro.volumeInfo.authors?.join(", ") || "Autor desconocido";
    const portada = libro.volumeInfo.imageLinks?.thumbnail || "../assets/imagenes/sinPortada.png";
    return `
        <div class="libroCard" data-id="${libro.id}">
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
async function buscarLibros(busqueda, startIndex = 0, orderBy = "relevance", intentosMaximos = 10, tiempoEspera = 1000) {
    const contenedor = document.getElementById("contenedorLibros");
    const mensajeBusqueda = document.getElementById("mensajeBusqueda");
    
    if (mensajeBusqueda) mensajeBusqueda.textContent = "";

    for (let intento = 1; intento <= intentosMaximos; intento++) {
        if (contenedor) {
            contenedor.innerHTML = `
               <div class="loaderContenedor">
                    <img src="../assets/imagenes/icons8-hilandero.gif" alt="Cargando..." class="loaderGif">
                    <p class="loaderContenedor__texto">Buscando libros...</p>
                </div>
            `;
        }

        try {
            const respuesta = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${busqueda}&maxResults=14&startIndex=${startIndex}&orderBy=${orderBy}&key=AIzaSyCCBbzjpNC-4rG4Lvti2YUnocS9Q4uEt0w`
            );
            
            const datos = await respuesta.json();
            
            if (!respuesta.ok) {
                console.error("Error de la API:", datos.error?.message || "Error desconocido");
                throw new Error(datos.error?.message || "Error en la respuesta de la API");
            }
            
            mostrarLibros(datos.items || []);
            return datos;

        } catch (error) {
            console.warn(`Intento ${intento} fallido para la búsqueda:`, error);

            if (intento < intentosMaximos) {
                await new Promise(resolve => setTimeout(resolve, tiempoEspera));
            } else {
                if (contenedor) {
                    contenedor.innerHTML = `
                        <div class="loaderContenedor loaderContenedor--error">
                            <p class="loaderContenedor__texto">No se pudo conectar con la API de Google Books después de varios intentos</p>
                            <button id="btnReintentarBusqueda" class="loaderContenedor__boton">
                                Reintentar búsqueda
                            </button>
                        </div>
                    `;
                    
                    const btnReintentar = document.getElementById("btnReintentarBusqueda");
                    if (btnReintentar) {
                        btnReintentar.addEventListener("click", () => {
                            buscarLibros(busqueda, startIndex, orderBy);
                        });
                    }
                }
                return null;
            }
        }
    }
}