let conexion = true;

const fotoCultivo = document.getElementById("fotoCultivo");
const previewFoto = document.getElementById("previewFoto");
const mensaje = document.getElementById("mensajeRegistro");
const tabla = document.getElementById("tablaCultivos");
const estadoConexion = document.getElementById("estadoConexion");

/* =========================
   CAMBIAR CONEXIÓN
========================= */

document.getElementById("btnCambiarConexion").onclick = function () {

    conexion = !conexion;

    if (conexion) {

        estadoConexion.innerHTML = "🟢 Conectado";
        estadoConexion.className = "estado-online";
        this.innerHTML = "Simular Sin Conexión";

    } else {

        estadoConexion.innerHTML = "🔴 Sin conexión";
        estadoConexion.className = "estado-online estado-offline";
        this.innerHTML = "Restablecer conexión";

    }

};


/* =========================
   VISTA PREVIA
========================= */

fotoCultivo.addEventListener("change", () => {

    const archivo = fotoCultivo.files[0];

    if (!archivo) return;

    const formatosPermitidos = [
        "image/jpeg",
        "image/jpg",
        "image/png"
    ];

    if (!formatosPermitidos.includes(archivo.type)) {

        mensaje.style.display = "block";
        mensaje.className = "mensaje-error";

        mensaje.innerHTML = `
            ❌ Formato no permitido.<br>
            Solo se aceptan archivos JPG y PNG.
        `;

        fotoCultivo.value = "";
        previewFoto.src = "assets/images/subir-imagen.png";

        return;

    }

    previewFoto.src = URL.createObjectURL(archivo);

});


/* =========================
   REGISTRAR CULTIVO
========================= */

document.getElementById("btnRegistrar").addEventListener("click", () => {

    const cultivo = document.getElementById("nombreCultivo").value;
    const ubicacion = document.getElementById("ubicacion").value;
    const observaciones = document.getElementById("observaciones").value;
    const archivo = fotoCultivo.files[0];

    if (
        cultivo === "" ||
        ubicacion === "" ||
        observaciones === "" ||
        !archivo
    ) {

        mensaje.style.display = "block";
        mensaje.className = "mensaje-error";

        mensaje.innerHTML = `
            ❌ Complete todos los campos y adjunte una fotografía.
        `;

        return;

    }

    const formatosPermitidos = [
        "image/jpeg",
        "image/jpg",
        "image/png"
    ];

    if (!formatosPermitidos.includes(archivo.type)) {

        mensaje.style.display = "block";
        mensaje.className = "mensaje-error";

        mensaje.innerHTML = "❌ Formato no permitido.";

        return;

    }

    let estado;

    if (conexion) {

        estado = "Sincronizado";

        mensaje.className = "mensaje-exito";

        mensaje.innerHTML = `
            ✅ Cultivo registrado correctamente.<br>
            📷 Evidencia sincronizada con la nube.
        `;

    } else {

        estado = "Pendiente";

        mensaje.className = "mensaje-error";

        mensaje.innerHTML = `
            📡 Sin conexión.<br>
            El cultivo quedó pendiente de sincronización.
        `;

    }

    mensaje.style.display = "block";

    const foto = URL.createObjectURL(archivo);

    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${cultivo}</td>
        <td>${ubicacion}</td>
        <td>${observaciones}</td>
        <td>
            <img src="${foto}" width="90">
        </td>
        <td class="${estado === "Pendiente" ? "pendiente" : "sincronizado"}">
            ${estado}
        </td>
    `;

    tabla.appendChild(fila);

    document.getElementById("nombreCultivo").value = "";
    document.getElementById("ubicacion").value = "";
    document.getElementById("observaciones").value = "";
    fotoCultivo.value = "";

    previewFoto.src = "assets/images/subir-imagen.png";

});


/* =========================
   SINCRONIZAR
========================= */

document.getElementById("btnSincronizar").onclick = function () {

    const filas = tabla.querySelectorAll("tr");

    if (!conexion) {

        alert("❌ No hay conexión para sincronizar.");

        return;

    }

    filas.forEach(fila => {

        const estado = fila.cells[4];

        if (estado.innerHTML.trim() === "Pendiente") {

            estado.innerHTML = "Sincronizado";
            estado.className = "sincronizado";

        }

    });

    alert("✅ Todos los registros pendientes fueron sincronizados.");

};


/* =========================
   CERRAR SESIÓN
========================= */

const btnCerrarSesion = document.getElementById("btnCerrarSesion");
const logoutOverlay = document.getElementById("logoutOverlay");
const btnCancelarLogout = document.getElementById("btnCancelarLogout");
const btnAceptarLogout = document.getElementById("btnAceptarLogout");

if (btnCerrarSesion) {

    btnCerrarSesion.onclick = function () {

        logoutOverlay.style.display = "flex";

    };

    btnCancelarLogout.onclick = function () {

        logoutOverlay.style.display = "none";

    };

    btnAceptarLogout.onclick = function () {

        window.location.href = "login.html";

    };

}