// Obtenemos referencias a los elementos del HTML
const inputNombre = document.getElementById("nombre");
const inputPassword = document.getElementById("password");

const btnRegistrar = document.getElementById("btnRegistrar");
const btnLogin = document.getElementById("btnLogin");

const mensaje = document.getElementById("mensaje");


function mostrarMensaje(texto, tipo) {

    mensaje.textContent = texto;

    mensaje.className = "";

    mensaje.classList.add(tipo);

    mensaje.style.display = "block";
}


btnRegistrar.addEventListener("click", 
    function () {

    const nombre = inputNombre.value;
    const password = inputPassword.value;

    console.log("Registrar:", nombre, password);

    mostrarMensaje(
        "Esto luego lo responderá el backend",
        "info"
    );
});

btnLogin.addEventListener("click", 
    function () {

    const nombre = inputNombre.value;
    const password = inputPassword.value;

    console.log("Login:", nombre, password);

    mostrarMensaje(
        "Esto luego lo responderá el backend",
        "info"
    );
});