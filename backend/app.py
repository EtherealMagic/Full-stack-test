from flask import Flask, request
import sqlite3
from crear_db import crear_base

crear_base()

app = Flask(__name__)


@app.route("/")
def inicio():
    return "Backend funcionando"


@app.route("/registrar", methods=["POST"])
def registrar():

    datos = request.get_json()

    nombre = datos["nombre"].lower()
    password = datos["password"]

    conexion = sqlite3.connect("usuarios.db")
    cursor = conexion.cursor()

    try:

        cursor.execute(
            """
            INSERT INTO usuarios(nombre, password)
            VALUES (?, ?)
            """,
            (nombre, password)
        )

        conexion.commit()

        return {
            "estado": "ok",
            "mensaje": "Usuario creado"
        }

    except sqlite3.IntegrityError:

        return {
            "estado": "error",
            "mensaje": "Usuario ya existe"
        }

    finally:
        conexion.close()

@app.route("/login", methods=["POST"])
def login():

    datos = request.get_json()

    nombre = datos["nombre"].lower()
    password = datos["password"]

    conexion = sqlite3.connect("usuarios.db")
    cursor = conexion.cursor()

    cursor.execute(
        """
        SELECT password
        FROM usuarios
        WHERE nombre = ?
        """,
        (nombre,)
    )

    usuario = cursor.fetchone()

    conexion.close()

    if usuario is None:

        return {
            "estado": "error",
            "mensaje": "Usuario no existe"
        }

    if usuario[0] != password:

        return {
            "estado": "error",
            "mensaje": "Contraseña incorrecta"
        }

    return {
        "estado": "ok",
        "mensaje": "Inicio de sesión correcto"
    }

if __name__ == "__main__":
    app.run(debug=True)