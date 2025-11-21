import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";


const app = express();
const PORT = environments.port;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hola mundo desde Express.js");
});

// Mostrar productos

app.get("/products", async (req, res) => {
    try {
        const sql = "SELECT * FROM productos";
        const [rows] = await connection.query(sql); //guardamos las filas de las consultas sql
        
        res.status(200).json({ //estado 200 ok
            payload: rows
        });
        
    } catch (error) { //estado 500 error
        console.error("Error obteniendo productos", error.message);
        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
});

app.get("/products/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let sql = "SELECT * FROM productos WHERE productos.id = ?";
        
        let [rows] = await connection.query(sql, [id]);
        console.log(rows);
        
        res.status(200).json({ //estado 200 bueno
            payload: rows
        });
        
    } catch (error) {
        console.error(`Error obteniendo productos con id ${id}`, error.message);
        
        res.status(500).json({ // estado 500 malo
            message: "Error interno al obtener producto in id"
        });
    }
});

// Crear productos
 
app.post("/products", async (req, res) => {
    try {
        const { autor, genero, imagen, precio, tipo, titulo} = req.body;

        console.log(req.body);
        

    } catch(error) {
        console.error("Error interno del servidor");

        res.status(500).json ({
            message: "Error interno del servidor",
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});