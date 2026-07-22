document.addEventListener("click", (evento) => {
    const tarjeta = evento.target.closest(".libroCard");
    if (!tarjeta) {
        return;
    }
    const id = tarjeta.dataset.id;
    window.location.href = `libro-detalles.html?id=${id}`;
});