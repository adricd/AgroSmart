document.addEventListener("DOMContentLoaded", function(){

    const btnEditar = document.getElementById("btnEditar");
    const modalCuenta = document.getElementById("modalCuenta");
    const btnCancelar = document.getElementById("btnCancelar");
    const btnGuardar = document.getElementById("btnGuardar");

    const inputNombre = document.getElementById("inputNombre");
    const inputCorreo = document.getElementById("inputCorreo");
    const inputTelefono = document.getElementById("inputTelefono");
    const inputUbicacion = document.getElementById("inputUbicacion");

    const datoNombre = document.getElementById("datoNombre");
    const datoCorreo = document.getElementById("datoCorreo");
    const datoTelefono = document.getElementById("datoTelefono");
    const datoUbicacion = document.getElementById("datoUbicacion");

    const nombreVista = document.getElementById("nombreVista");
    const correoVista = document.getElementById("correoVista");

    const notificacionCuenta = document.getElementById("notificacionCuenta");

    btnEditar.addEventListener("click", function(){
        modalCuenta.style.display = "flex";
    });

    btnCancelar.addEventListener("click", function(){
        modalCuenta.style.display = "none";
    });

    btnGuardar.addEventListener("click", function(){

        datoNombre.textContent = inputNombre.value;
        datoCorreo.textContent = inputCorreo.value;
        datoTelefono.textContent = inputTelefono.value;
        datoUbicacion.textContent = inputUbicacion.value;

        nombreVista.textContent = inputNombre.value;
        correoVista.textContent = inputCorreo.value;

        modalCuenta.style.display = "none";
        notificacionCuenta.style.display = "block";

        setTimeout(function(){
            notificacionCuenta.style.display = "none";
        }, 2500);

    });

});