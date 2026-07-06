const btnCalcular = document.getElementById("btnCalcular");

btnCalcular.addEventListener("click", () => {

    const inputSemillas = document.getElementById("semillas");
    const inputFertilizantes = document.getElementById("fertilizantes");
    const inputManoObra = document.getElementById("manoObra");
    const inputIngresos = document.getElementById("ingresos");

    // Validar campos vacíos
    if (
        inputSemillas.value.trim() === "" ||
        inputFertilizantes.value.trim() === "" ||
        inputManoObra.value.trim() === "" ||
        inputIngresos.value.trim() === ""
    ) {

        alert("Debe completar todos los campos para calcular el ROI.");
        return;
    }

    const semillas = Number(inputSemillas.value);
    const fertilizantes = Number(inputFertilizantes.value);
    const manoObra = Number(inputManoObra.value);
    const ingresos = Number(inputIngresos.value);

    // Validar que los valores sean mayores que 0
    if (
        semillas <= 0 ||
        fertilizantes <= 0 ||
        manoObra <= 0 ||
        ingresos <= 0
    ) {

        alert("Todos los valores deben ser mayores que 0.");
        return;
    }

    const costosTotales =
        semillas + fertilizantes + manoObra;

    const utilidad =
        ingresos - costosTotales;

    let roi = 0;

    if (costosTotales > 0) {
        roi = (utilidad / costosTotales) * 100;
    }

    document.getElementById("costosTotales").textContent =
        `S/ ${costosTotales.toFixed(2)}`;

    document.getElementById("ingresosResultado").textContent =
        `S/ ${ingresos.toFixed(2)}`;

    document.getElementById("utilidadResultado").textContent =
        `S/ ${utilidad.toFixed(2)}`;

    document.getElementById("roiResultado").textContent =
        `${roi.toFixed(2)}%`;

    const mensajeROI =
        document.getElementById("mensajeROI");

    if (roi >= 50) {

        mensajeROI.textContent =
            "Excelente rentabilidad. Tu campaña agrícola presenta un retorno de inversión muy favorable. Mantén la estrategia actual y evalúa oportunidades de expansión.";

    } else if (roi >= 20) {

        mensajeROI.textContent =
            "La rentabilidad es aceptable. Existen oportunidades para optimizar costos de producción y aumentar los beneficios obtenidos.";

    } else if (roi > 0) {

        mensajeROI.textContent =
            "La rentabilidad es baja. Se recomienda revisar gastos operativos, rendimiento del cultivo y estrategias de producción.";

    } else {

        mensajeROI.textContent =
            "La campaña presenta pérdidas o no genera ganancias suficientes. Analiza los costos e ingresos proyectados antes de tomar decisiones.";

    }

});

const btnCerrarSesion = document.getElementById("btnCerrarSesion");
const logoutOverlay = document.getElementById("logoutOverlay");
const btnCancelarLogout = document.getElementById("btnCancelarLogout");
const btnAceptarLogout = document.getElementById("btnAceptarLogout");

if (btnCerrarSesion) {

    btnCerrarSesion.onclick = function () {

        logoutOverlay.style.display = "flex";

    }

    btnCancelarLogout.onclick = function () {

        logoutOverlay.style.display = "none";

    }

    btnAceptarLogout.onclick = function () {

        window.location.href = "login.html";

    }

}