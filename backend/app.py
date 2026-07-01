from flask import Flask, request

app = Flask(__name__)


@app.route("/")
def inicio():
    return "Backend funcionando"


@app.route("/registrar", methods=["POST"])
def registrar():

    datos = request.get_json()

    print(datos)

    return {
        "mensaje": "Datos recibidos correctamente"
    }


if __name__ == "__main__":
    app.run(debug=True)