import express from "express";
const app = express();

import environments from "./src/api/config/environments.js";
const PORT = environments.port;

import connection from "./src/api/database/db.js";

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


app.get("/", (req, res) => {
    res.send("Hola mundo desde Express.js");
});



app.get("/products", async (req, res) => {
    try {
        const sql = "SELECT * FROM productos";
        const [rows] = await connection.query(sql);

        res.status(200).json({
            payload: rows
        });
    
    } catch (error) {
        console.error("Error obteniendo productos", error.message);
        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }

});