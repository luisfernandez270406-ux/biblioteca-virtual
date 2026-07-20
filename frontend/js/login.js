const formulario = document.getElementById("formLogin"); // obtenemos el formulario
formulario.addEventListener("submit", async (event) => {
    event.preventDefault();// evitamos que la pagina se recarge
    const nombreUsuario = document
        .getElementById("nombreUsuario")
        .value;

    const password = document
        .getElementById("password")
        .value;
});


