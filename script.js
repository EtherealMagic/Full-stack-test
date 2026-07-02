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


btnRegistrar.addEventListener(
    "click",
    async function () {

        const nombre = inputNombre.value;
        const password = inputPassword.value;

        const respuesta = await fetch(
            "http://127.0.0.1:5000/registrar",
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

        } else {

            mostrarMensaje(
                "Este usuario ya existe",
                "info"
            );

        }

    }
);

btnLogin.addEventListener("click", 
    async function () {

        const nombre = inputNombre.value;
        const password = inputPassword.value;

        const respuesta = await fetch(
            "http://localhost:5000/login",
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
    } else {
            
            mostrarMensaje(
                "Usuario y/o contraseña inválidos",
                "error"
            )
    }
    });

async function probarAPI() {

    const respuesta = await fetch(
        "http://127.0.0.1:5000/login",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nombre: "Tobias",
                password: "1234"
            })
        }
    );

    const datos = await respuesta.json();

    console.log(datos);
}

probarAPI();