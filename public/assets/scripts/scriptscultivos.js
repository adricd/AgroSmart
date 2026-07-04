const fotoCultivo =
document.getElementById("fotoCultivo");

const previewFoto =
document.getElementById("previewFoto");

const mensaje =
document.getElementById("mensajeRegistro");

const tabla =
document.getElementById("tablaCultivos");


/* =========================
   VISTA PREVIA
========================= */

fotoCultivo.addEventListener("change", () => {

    const archivo = fotoCultivo.files[0];

    if(!archivo) return;

    const formatosPermitidos = [
        "image/jpeg",
        "image/jpg",
        "image/png"
    ];

    if(!formatosPermitidos.includes(archivo.type)){

        mensaje.style.display = "block";
        mensaje.className = "mensaje-error";

        mensaje.innerHTML = `
            ❌ Formato no permitido.
            <br>
            Solo se aceptan archivos JPG y PNG.
        `;

        fotoCultivo.value = "";

        previewFoto.src =
        "imagenes/subir-imagen.png";

        return;
    }

    previewFoto.src =
    URL.createObjectURL(archivo);
});


/* =========================
   REGISTRAR CULTIVO
========================= */

document
.getElementById("btnRegistrar")
.addEventListener("click", () => {

    const cultivo =
    document.getElementById("nombreCultivo").value;

    const ubicacion =
    document.getElementById("ubicacion").value;

    const observaciones =
    document.getElementById("observaciones").value;

    const archivo =
    fotoCultivo.files[0];

    if(
        cultivo === "" ||
        ubicacion === "" ||
        observaciones === "" ||
        !archivo
    ){

        mensaje.style.display = "block";
        mensaje.className = "mensaje-error";

        mensaje.innerHTML = `
            ❌ Complete todos los campos
            y adjunte una fotografía.
        `;

        return;
    }

    const formatosPermitidos = [
        "image/jpeg",
        "image/jpg",
        "image/png"
    ];

    if(!formatosPermitidos.includes(archivo.type)){

        mensaje.style.display = "block";
        mensaje.className = "mensaje-error";

        mensaje.innerHTML = `
            ❌ Formato no permitido.
        `;

        return;
    }

    mensaje.style.display = "block";
    mensaje.className = "mensaje-exito";

    mensaje.innerHTML = `
        ✅ Cultivo registrado correctamente.
        <br>
        📷 Evidencia fotográfica guardada.
    `;

    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${cultivo}</td>
        <td>${ubicacion}</td>
        <td>${observaciones}</td>
        <td>
            <img src="${URL.createObjectURL(archivo)}">
        </td>
    `;

    tabla.appendChild(fila);

    document.getElementById("nombreCultivo").value = "";
    document.getElementById("ubicacion").value = "";
    document.getElementById("observaciones").value = "";
    fotoCultivo.value = "";

    previewFoto.src =
    "imagenes/subir-imagen.png";
});
const btnCerrarSesion = document.getElementById("btnCerrarSesion");
const logoutOverlay = document.getElementById("logoutOverlay");
const btnCancelarLogout = document.getElementById("btnCancelarLogout");
const btnAceptarLogout = document.getElementById("btnAceptarLogout");

if(btnCerrarSesion){

    btnCerrarSesion.onclick = function(){

        logoutOverlay.style.display="flex";

    }

    btnCancelarLogout.onclick=function(){

        logoutOverlay.style.display="none";

    }

    btnAceptarLogout.onclick=function(){

        window.location.href="login.html";

    }

} 