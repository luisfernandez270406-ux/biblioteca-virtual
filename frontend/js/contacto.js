document.addEventListener("DOMContentLoaded", async () => {
    // 1. Cargar datos del usuario en la barra de navegación
    const usuarioString = localStorage.getItem("usuario");
    if (usuarioString) {
        const usuario = JSON.parse(usuarioString);
        
        const spanNombreNav = document.getElementById("nombreUsuario");
        if (spanNombreNav) spanNombreNav.textContent = usuario.nombreUsuario || "Usuario";

        const spanNombreCompleto = document.getElementById("nombreCompleto");
        if (spanNombreCompleto) spanNombreCompleto.textContent = usuario.nombreUsuario || "Sin nombre";

        const spanCorreo = document.getElementById("correo");
        if (spanCorreo) spanCorreo.textContent = usuario.correo || usuario.email || "No disponible";

        const spanFecha = document.getElementById("fechaRegistro");
        if (spanFecha) {
            const fechaCruda = usuario.createdAt;
            if (fechaCruda) {
                const fecha = new Date(fechaCruda);
                spanFecha.textContent = fecha.toLocaleDateString();
            } else {
                spanFecha.textContent = "No disponible";
            }
        }
        
        const spanRol = document.getElementById("rol");
        if (spanRol) {
            spanRol.textContent = usuario.rol || "Lector";
        }
    }

    // 2. Configurar el menú desplegable del usuario de manera segura
    const botonUsuario = document.querySelector(".navbar__usuarioToggle");
    const menu = document.querySelector(".navbar__dropdown");

    if (botonUsuario && menu) {
        botonUsuario.addEventListener("click", () => {
            menu.classList.toggle("activo");
        });

        document.addEventListener("click", (evento) => {
            if (!botonUsuario.contains(evento.target) && !menu.contains(evento.target)) {
                menu.classList.remove("activo");
            }
        });
    }

    // 3. Configurar el botón de cerrar sesión
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("usuario");
            window.location.href = "login.html";
        });
    }

    // 4. Conteo de favoritos (si la página lo requiere)
    await cargarConteoFavoritos();

    // 5. Lógica específica del formulario de contacto (si estamos en la página de contacto)
    configurarFormularioContacto();
});

async function cargarConteoFavoritos() {
    try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const respuesta = await fetch("http://localhost:3000/api/favoritos", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const datos = await respuesta.json();
        
        const spanCantidadFavs = document.getElementById("cantidadFavoritos");
        if (spanCantidadFavs && datos.favoritos) {
            spanCantidadFavs.textContent = datos.favoritos.length;
        } else if (spanCantidadFavs) {
            spanCantidadFavs.textContent = "0";
        }
    } catch (error) {
        console.error("Error al obtener el conteo de favoritos:", error);
        const spanCantidadFavs = document.getElementById("cantidadFavoritos");
        if (spanCantidadFavs) spanCantidadFavs.textContent = "0";
    }
}

// Función exclusiva para manejar el envío del formulario de contacto que hiciste antes
function configurarFormularioContacto() {
    const formContacto = document.getElementById("formContacto");

    if (formContacto) {
        formContacto.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(formContacto);
            const tipoSeleccionado = document.querySelector('input[name="tipoSolicitud"]:checked');
            if (tipoSeleccionado) {
                formData.set("tipoSolicitud", tipoSeleccionado.value);
            }

            try {
                const respuesta = await fetch("http://localhost:3000/api/contacto", {
                    method: "POST",
                    body: formData
                });

                const datos = await respuesta.json();

                if (respuesta.ok) {
                    alert(datos.mensaje || "¡Solicitud enviada correctamente!");
                    formContacto.reset();
                    
                    const spanArchivo = document.getElementById("nombreArchivo");
                    if (spanArchivo) spanArchivo.textContent = "Ningún archivo seleccionado";
                } else {
                    alert(datos.mensaje || "Hubo un error al enviar la solicitud.");
                }
            } catch (error) {
                console.error("Error de red:", error);
                alert("No se pudo conectar con el servidor.");
            }
        });

        // Mostrar nombre del archivo seleccionado dinámicamente
        const inputArchivo = document.getElementById("archivo");
        if (inputArchivo) {
            inputArchivo.addEventListener("change", (e) => {
                const spanArchivo = document.getElementById("nombreArchivo");
                if (spanArchivo) {
                    if (e.target.files.length > 0) {
                        spanArchivo.textContent = e.target.files[0].name;
                    } else {
                        spanArchivo.textContent = "Ningún archivo seleccionado";
                    }
                }
            });
        }
    }
}