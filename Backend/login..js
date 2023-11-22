const express = require("express");
const db = require("./server");
const router = express.Router();

router.post("/login", (req, res) => {
  const { correo, password } = req.body;
  const sql = "SELECT * FROM usuario WHERE correo = ? AND password = ?";
  db.query(sql, [correo, password], (err, data) => {
    if (err) {
      console.error("Error al autenticar:", err);
      return res.status(500).json({ error: "Error al autenticar" });
    }

    if(results.length  > 0){
        return res.json({ success: true });
    } else {
      // Las credenciales no son válidas
      return res.json({ success: false });
    }
  });
});

application.listen(8081, () => {
  console.log("Servidor escuchando en el puesto 8082")
})
