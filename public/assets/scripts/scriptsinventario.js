let inventario = [
    {
        nombre: "Urea",
        marca: "AgroPlus",
        stock: 8,
        precio: 3.5,
        vencimiento: "2026-08-15"
    },
    {
        nombre: "Pesticida X",
        marca: "BioControl",
        stock: 25,
        precio: 20,
        vencimiento: "2025-01-01"
    }
];

let stockMinimos = {};

const tabla = document.getElementById("tablaInventario");
const comboSalida = document.getElementById("insumoSalida");
const comboMinimo = document.getElementById("insumoMinimo");

function actualizarTabla() {

    tabla.innerHTML = "";

    inventario.forEach(item => {

        tabla.innerHTML += `
        <tr>
            <td>${item.nombre}</td>
            <td>${item.marca}</td>
            <td>${item.stock}</td>
            <td>S/. ${item.precio.toFixed(2)}</td>
            <td>${item.vencimiento}</td>
        </tr>
        `;
    });

    actualizarCombos();
    revisarCaducidad();
}

function actualizarCombos() {

    comboSalida.innerHTML = "";
    comboMinimo.innerHTML = "";

    inventario.forEach(item => {

        comboSalida.innerHTML += `
            <option>${item.nombre}</option>
        `;

        comboMinimo.innerHTML += `
            <option>${item.nombre}</option>
        `;
    });
}

document.getElementById("btnCompra").addEventListener("click", () => {

    const nombre =
        document.getElementById("nombreInsumo").value;

    const marca =
        document.getElementById("marcaInsumo").value;

    const cantidad =
        Number(document.getElementById("cantidadCompra").value);

    const precio =
        Number(document.getElementById("precioCompra").value);

    const fecha =
        document.getElementById("fechaVencimiento").value;

    if(!nombre || !marca || !cantidad || !precio || !fecha){
        alert("Complete todos los campos");
        return;
    }

    inventario.push({
        nombre,
        marca,
        stock:cantidad,
        precio,
        vencimiento:fecha
    });

    actualizarTabla();

    const valorInventario = cantidad * precio;

    document.getElementById("mensajeCompra").style.display = "block";

    document.getElementById("mensajeCompra").innerHTML = `
        ✅ Compra registrada correctamente.<br><br>
        Stock actualizado: ${cantidad}<br>
        Valor inventario: S/. ${valorInventario.toFixed(2)}
    `;
});

document.getElementById("btnSalida").addEventListener("click", () => {

    const nombre =
        comboSalida.value;

    const cantidad =
        Number(document.getElementById("cantidadSalida").value);

    const producto =
        inventario.find(x => x.nombre === nombre);

    if(cantidad > producto.stock){

        document.getElementById("mensajeSalida").style.display = "block";

        document.getElementById("mensajeSalida").innerHTML = `
            ❌ Stock insuficiente.<br>
            Solicitud: ${cantidad}<br>
            Disponible: ${producto.stock}
        `;

        return;
    }

    producto.stock -= cantidad;

    actualizarTabla();

    document.getElementById("mensajeSalida").className = "mensaje-exito";

    document.getElementById("mensajeSalida").style.display = "block";

    document.getElementById("mensajeSalida").innerHTML = `
        ✅ Salida registrada correctamente.
    `;

    verificarStockMinimo(producto);
});

document.getElementById("btnMinimo").addEventListener("click", () => {

    const nombre = comboMinimo.value;

    const minimo =
        Number(document.getElementById("stockMinimo").value);

    stockMinimos[nombre] = minimo;

    document.getElementById("mensajeMinimo").style.display = "block";

    document.getElementById("mensajeMinimo").innerHTML = `
        ⚠ Alerta configurada en ${minimo} unidades.
    `;
});

function verificarStockMinimo(producto){

    const minimo =
        stockMinimos[producto.nombre];

    if(!minimo) return;

    if(producto.stock < minimo){

        document.getElementById("notificaciones").innerHTML = `
        <div class="mensaje-warning">
            ⚠ El stock de ${producto.nombre}
            ha bajado por debajo del mínimo configurado.
        </div>
        `;
    }
}

function revisarCaducidad(){

    const hoy = new Date();

    const vencidos =
        inventario.filter(item =>
            new Date(item.vencimiento) < hoy
        );

    if(vencidos.length > 0){

        document.getElementById("alertaCaducidad").innerHTML = `
        🚨 ALERTA CRÍTICA<br><br>
        El producto "${vencidos[0].nombre}"
        ha superado su fecha de expiración.
        <br><br>
        Se recomienda NO aplicar este insumo.
        `;
    }
}

actualizarTabla();
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