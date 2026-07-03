const url = "http://localhost:5000"
const inputNombre = document.getElementById("nombre");
const inputPassword = document.getElementById("password");

const btnRegistrar = document.getElementById("btnRegistrar");
const btnLogin = document.getElementById("btnLogin");
const btnCerrarSesion = document.getElementById("btnCerrarSesion");

const mensaje = document.getElementById("mensaje");
const contenedor = document.getElementById("previo");
const contenedor2 = document.getElementById("posterior");
const usuario = document.getElementById("usuario");
const fondo = document.body;

function mostrarMensaje(texto, tipo) {

    mensaje.textContent = texto;

    mensaje.className = "";

    mensaje.classList.add(tipo);

    mensaje.style.display = "block";

    setTimeout(() => {

        mensaje.textContent = "";
        mensaje.className = "";
        mensaje.style.display = "none";
    }, 4000);
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
                contenedor.classList.remove("animacion3")
                contenedor2.classList.remove("animacion1")

                contenedor.classList.add("animacion1");
                setTimeout(() => {
                    contenedor2.classList.remove('oculto');
                    contenedor.classList.add('oculto');
                    contenedor2.classList.add('animacion3')
                    usuario.textContent = inputNombre;
                    fondo.classList.remove("animacion4")
                    fondo.classList.add("animacion2");
                }, 3000);
                
                
        } else {
                
                mostrarMensaje(
                    "Usuario y/o contraseña inválidos",
                    "error"
                );
                inputNombre.value="";
                inputPassword.value="";
        }
    }});


btnCerrarSesion.addEventListener("click",
    function() {
        contenedor2.classList.remove("animacion3");
        contenedor.classList.remove("animacion1");
        fondo.classList.remove("animacion2");

        contenedor2.classList.add("animacion1");
        fondo.classList.add("animacion4");
        setTimeout(() => {
            contenedor2.classList.add("oculto");
            contenedor.classList.remove("oculto");
            contenedor.classList.add("animacion3");
            usuario.textContent="";
        },3000)
    }
)