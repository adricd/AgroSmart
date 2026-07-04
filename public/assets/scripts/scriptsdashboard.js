/* =========================
   DASHBOARD AGROSMART
========================= */

/* =========================
   ALERTAS DISPONIBLES
========================= */

const alertasDisponibles = [

    {
        texto: "⚠ Posible lluvia intensa en las próximas 24 horas",
        tipo: "clima",
        riesgo: "alto",
        clase: "alerta-roja"
    },

    {
        texto: "⚠ Incremento de vientos en la zona",
        tipo: "clima",
        riesgo: "medio",
        clase: "alerta-amarilla"
    },

    {
        texto: "⚠ Temperatura estable durante el día",
        tipo: "clima",
        riesgo: "bajo",
        clase: "alerta-verde"
    },

    {
        texto: "⚠ Posible infestación de pulgones",
        tipo: "plagas",
        riesgo: "alto",
        clase: "alerta-roja"
    },

    {
        texto: "⚠ Riesgo moderado de plagas detectado",
        tipo: "plagas",
        riesgo: "medio",
        clase: "alerta-amarilla"
    },

    {
        texto: "⚠ Monitoreo preventivo recomendado",
        tipo: "plagas",
        riesgo: "bajo",
        clase: "alerta-verde"
    },

    {
        texto: "⚠ Déficit hídrico detectado",
        tipo: "riego",
        riesgo: "alto",
        clase: "alerta-roja"
    },

    {
        texto: "⚠ Revisar humedad del terreno",
        tipo: "riego",
        riesgo: "medio",
        clase: "alerta-amarilla"
    },

    {
        texto: "⚠ Se recomienda riego preventivo esta mañana",
        tipo: "riego",
        riesgo: "bajo",
        clase: "alerta-verde"
    },

    {
        texto: "⚠ Inventario crítico de fertilizantes",
        tipo: "inventario",
        riesgo: "alto",
        clase: "alerta-roja"
    },

    {
        texto: "⚠ Stock bajo de pesticidas",
        tipo: "inventario",
        riesgo: "medio",
        clase: "alerta-amarilla"
    },

    {
        texto: "⚠ Inventario suficiente para la próxima semana",
        tipo: "inventario",
        riesgo: "bajo",
        clase: "alerta-verde"
    }

];

/* =========================
   ELEMENTOS GENERALES
========================= */

const btnActualizar = document.getElementById("btnActualizar");

/* =========================
   ACTUALIZAR DASHBOARD
========================= */

if (btnActualizar) {

    btnActualizar.addEventListener("click", () => {

        /* =========================
           MÉTRICAS
        ========================= */

        const cultivos = Math.floor(Math.random() * 8) + 5;
        const alertas = Math.floor(Math.random() * 5) + 1;
        const produccion = Math.floor(Math.random() * 15) + 8;
        const rentabilidad = Math.floor(Math.random() * 40) + 30;

        document.getElementById("cultivosActivos").textContent = cultivos;
        document.getElementById("alertasActivas").textContent = alertas;
        document.getElementById("produccionEstimada").textContent = produccion + " Tn";
        document.getElementById("rentabilidadPromedio").textContent = rentabilidad + "%";

        /* =========================
           CLIMA
        ========================= */

        const climas = [

            {
                icono: "assets/images/sol.png",
                temperatura: "29°C",
                estado: "Soleado",
                humedad: "💧 Humedad: 62%",
                lluvia: "🌧 Prob. lluvia: 10%",
                viento: "💨 Viento: 14 km/h"
            },

            {
                icono: "assets/images/nublado.png",
                temperatura: "22°C",
                estado: "Nublado",
                humedad: "💧 Humedad: 74%",
                lluvia: "🌧 Prob. lluvia: 35%",
                viento: "💨 Viento: 11 km/h"
            },

            {
                icono: "assets/images/lluviainicio.png",
                temperatura: "19°C",
                estado: "Lluvias",
                humedad: "💧 Humedad: 88%",
                lluvia: "🌧 Prob. lluvia: 80%",
                viento: "💨 Viento: 18 km/h"
            }

        ];

        const climaSeleccionado =
            climas[Math.floor(Math.random() * climas.length)];

        document.getElementById("iconoClima").src =
            climaSeleccionado.icono;

        document.getElementById("temperaturaClima").textContent =
            climaSeleccionado.temperatura;

        document.getElementById("estadoClima").textContent =
            climaSeleccionado.estado;

        document.getElementById("humedadClima").textContent =
            climaSeleccionado.humedad;

        document.getElementById("lluviaClima").textContent =
            climaSeleccionado.lluvia;

        document.getElementById("vientoClima").textContent =
            climaSeleccionado.viento;

        /* =========================
           ALERTAS DINÁMICAS
        ========================= */

        const alertasAleatorias =
            [...alertasDisponibles]
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);

        alertasAleatorias.forEach((alerta, index) => {

            const elemento =
                document.getElementById(`alerta${index + 1}`);

            if (!elemento) return;

            elemento.textContent = alerta.texto;

            elemento.dataset.tipo = alerta.tipo;
            elemento.dataset.riesgo = alerta.riesgo;

            elemento.className =
                `alerta-item ${alerta.clase}`;
        });

        aplicarFiltros();

    });

}

/* =========================
   US50 - FILTRO ALERTAS
========================= */

const filtroBtns =
    document.querySelectorAll(".filtro-btn");

const riesgoBtns =
    document.querySelectorAll(".riesgo-btn");

const alertasItems =
    document.querySelectorAll(".alerta-item");

let filtroTipo = "todos";
let filtroRiesgo = "todos";

filtroBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        filtroBtns.forEach(b =>
            b.classList.remove("activo")
        );

        btn.classList.add("activo");

        filtroTipo = btn.dataset.tipo;

        aplicarFiltros();

    });

});

riesgoBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        riesgoBtns.forEach(b =>
            b.classList.remove("activo")
        );

        btn.classList.add("activo");

        filtroRiesgo = btn.dataset.riesgo;

        aplicarFiltros();

    });

});

function aplicarFiltros() {

    const alertasItems =
        document.querySelectorAll(".alerta-item");

    const mensajeSinAlertas =
        document.getElementById("sinAlertas");

    let alertasVisibles = 0;

    alertasItems.forEach(alerta => {

        const tipo = alerta.dataset.tipo;
        const riesgo = alerta.dataset.riesgo;

        let mostrar = true;

        if (
            filtroTipo !== "todos" &&
            tipo !== filtroTipo
        ) {
            mostrar = false;
        }

        if (
            filtroRiesgo !== "todos" &&
            riesgo !== filtroRiesgo
        ) {
            mostrar = false;
        }

        alerta.style.display =
            mostrar ? "block" : "none";

        if (mostrar) {
            alertasVisibles++;
        }

    });

    if (mensajeSinAlertas) {

        mensajeSinAlertas.style.display =
            alertasVisibles === 0
                ? "block"
                : "none";
    }

}


const inputImagen =
    document.getElementById("imagenPlaga");

const previewImagen =
    document.getElementById("previewPlaga");

const btnIA =
    document.getElementById("btnAnalizarPlaga");

const resultadoIA =
    document.getElementById("resultadoIA");

/* =========================
   VISTA PREVIA DE IMAGEN
========================= */

if (inputImagen) {

    inputImagen.addEventListener("change", (e) => {

        const archivo = e.target.files[0];

        if (!archivo) return;

        const lector = new FileReader();

        lector.onload = function (evento) {

            previewImagen.src =
                evento.target.result;

        };

        lector.readAsDataURL(archivo);

    });

}

/* =========================
   RESULTADOS IA
========================= */

const resultadosIA = [

    "🟢 No se detectaron plagas. Cultivo en excelente estado.",

    "🟢 Cultivo saludable. No se observan anomalías.",

    "🟢 Desarrollo normal. Sin indicios de infestación.",

    "🟡 Posible presencia de pulgones en etapa inicial.",

    "🟡 Riesgo moderado de insectos en hojas jóvenes.",

    "🟡 Se recomienda monitoreo preventivo durante la semana.",

    "🟠 Posible presencia de hongos por exceso de humedad.",

    "🟠 Se detectan patrones compatibles con estrés vegetal.",

    "🟠 Riesgo medio de propagación de plagas.",

    "🔴 Alta probabilidad de infestación detectada.",

    "🔴 Posibles daños severos en hojas y tallos.",

    "🔴 Se recomienda intervención inmediata del cultivo."

];

/* =========================
   ANALIZAR IMAGEN
========================= */

if (btnIA) {

    btnIA.addEventListener("click", () => {

        if (!inputImagen.files.length) {

            resultadoIA.textContent =
                "⚠ Primero selecciona una imagen.";

            return;
        }

        resultadoIA.textContent =
            "🔎 Analizando imagen del cultivo...";

        setTimeout(() => {

            const resultado =
                resultadosIA[
                    Math.floor(
                        Math.random() *
                        resultadosIA.length
                    )
                ];

            resultadoIA.textContent =
                resultado;

        }, 2000);

    });

}
/* =========================
   US13 - RECEPCIÓN DE ALERTA
========================= */

window.addEventListener("DOMContentLoaded", () => {

    const notificacion =
        document.getElementById("notificacionClima");

    if (notificacion) {

        setTimeout(() => {
            notificacion.classList.remove("hidden");
        }, 1000);

        setTimeout(() => {
            notificacion.classList.add("hidden");
        }, 5000);

    }

    if (btnActualizar) {
        btnActualizar.click();
    }

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