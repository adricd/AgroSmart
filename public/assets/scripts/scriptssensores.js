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