from flask import Flask, request
from flask_cors import CORS
from db import crear_base, registrar_en_base, logear_en_base, consultar_cantidad
import os

#actualizar requisitos con  pip freeze > .\requirements.txt antes de pushear 

app = Flask(__name__)

CORS(app)

crear_base()

@app.route("/registrar", methods=["POST"])
def registrar():

    datos = request.get_json()

    nombre = datos["nombre"]
    password = datos["password"]

    if registrar_en_base(nombre, password):
        return {
            "estado" : "ok"
        }
    else:
        return {
            "estado" : "error"
        }

@app.route("/login", methods=["POST"])
def login():

    datos = request.get_json()

    nombre = datos["nombre"]
    password = datos["password"]

    if logear_en_base(nombre, password):
        return {
            "estado" : "ok",
            "cantidad" : consultar_cantidad()
        }
    else: 
        return {
            "estado" : "error"
        }
    

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port= int(os.environ.get("PORT", 5000)),
        debug=True
        )