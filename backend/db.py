import sqlite3
import pandas as pd
from werkzeug import security
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent
ruta = BASE_DIR / "usuarios.db"

def crear_base():

    conexion = sqlite3.connect(ruta)
    cursor = conexion.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    """)

    conexion.commit()
    conexion.close()


def registrar_en_base(nombre, password):
    conexion = sqlite3.connect(ruta)
    cursor = conexion.cursor()

    hashed_pasword = security.generate_password_hash(password, method="scrypt", salt_length=16)

    try:

        cursor.execute(
            """
            INSERT INTO usuarios(nombre, password)
            VALUES (?, ?)
            """,
            (nombre, hashed_pasword)
        )

        conexion.commit()

        return True

    except sqlite3.IntegrityError:

        return False

    finally:
        conexion.close()

def logear_en_base(nombre, password): 
    conexion = sqlite3.connect(ruta)
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

        return False

    if not security.check_password_hash(usuario[0], password):

        return False

    return True

def consultar_cantidad():
    conexion = sqlite3.connect(ruta)
    consulta = pd.read_sql_query(
        """
        SELECT COUNT(*) as cantidad
        FROM usuarios;
        """, 
        conexion)
    return str(consulta["cantidad"][0])
    
consultar_cantidad()

    