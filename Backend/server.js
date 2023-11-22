//Configuracion para un servidor Node.js

const express = require("express"); //Con Express, puedes definir rutas, manejar solicitudes HTTP etc
const mysql = require("mysql"); //te permite interactuar con bases de datos MySQL
const cors = require("cors"); //El middleware cors para permitir solicitudes desde otros dominios.
const bodyParser = require("body-parser");

const app = express(); // Manejar solicitudes HTTP
app.use(cors());
app.use(bodyParser.json()); 

//Creamos la conexion con la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "react",
});

app.post("/register", (req, res) => { // ruta con el método HTTP POST.
  const { nombre, correo, password } = req.body;

  if (!nombre || !correo || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  //La consulta utiliza parámetros de marcador de posición (?) que luego se reemplazaran con los valores reales cuando se ejecute la consulta
  const sql = "INSERT INTO usuario (nombre, correo, password) VALUES (?, ?, ?)";
  db.query(sql, [nombre, correo, password], (err, result) => {
    if (err) {
      console.error("Error al registrar usuario:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Usuario registrado con éxito" });
  });
});

app.post("/login", (req, res) => {
  const { correo, password } = req.body;
  console.log("Correo:", correo);
  console.log("Contraseña:", password);

  if (!correo || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const sql = "SELECT * FROM usuario WHERE correo = ? AND password = ?";
  db.query(sql, [correo, password], (err, result) => {
    if (err) {
      console.error("Error al loguearse usuario:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    // Verifica si se encontró un usuario con las credenciales proporcionadas
    if (result.length > 0) {
      return res
        .status(200)
        .json({ success: true, message: "Usuario logueado con éxito" });
    } else {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
  });
});

app.listen(8081, () => { //un puerto específic
  console.log("listen");
});
