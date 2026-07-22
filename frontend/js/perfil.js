const usuario = JSON.parse(localStorage.getItem("usuario"));
if(usuario){
document.getElementById("nombreUsuario").textContent =
    usuario.nombreUsuario;
 }