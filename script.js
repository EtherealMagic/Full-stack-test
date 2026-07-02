const url = "http://localhost:5000"
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

    setTimeout(() => {

        mensaje.textContent = "";
        mensaje.className = "";
        mensaje.style.display = "none";

    }, 1000);
}


btnRegistrar.addEventListener(
    "click",
    async function () {

        const nombre = inputNombre.value;
        const password = inputPassword.value;

        if (nombre && password)
        {    const respuesta = await fetch(
                url.concat("","/registrar"),
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        nombre: nombre,
                        password: password
                    })
                }
            );

            const datos = await respuesta.json();

            if (datos.estado === "ok") {

                mostrarMensaje(
                    "Usuario creado correctamente",
                    "exito"
                );
                inputNombre.value="";
                inputPassword.value="";

            } else {

                mostrarMensaje(
                    "Este usuario ya existe",
                    "info"
                );
                inputNombre.value="";
                inputPassword.value="";
            }

        }}
);

btnLogin.addEventListener("click", 
    async function () {

        const nombre = inputNombre.value;
        const password = inputPassword.value;
        if (nombre && password) {
            const respuesta = await fetch(
                url.concat("","/login"),
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nombre: nombre,
                        password: password
                    })
                }
            )

            const datos = await respuesta.json();

        if (datos.estado === "ok") {

                mostrarMensaje(
                    "Conectado exitosamente", 
                    "exito"
                );
                inputNombre.value="";
                inputPassword.value="";
        } else {
                
                mostrarMensaje(
                    "Usuario y/o contraseña inválidos",
                    "error"
                );
                inputNombre.value="";
                inputPassword.value="";
        }
    }});
