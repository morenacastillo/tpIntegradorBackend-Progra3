import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";


const app = express();
const PORT = environments.port;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}]  ${req.method}  ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.send("Hola mundo desde Express.js");
    
});

// Mostrar productos =========================================

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
            message: "Error interno al obtener productos",
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
        });
    }
});

app.get("/products/:id", async (req, res) => {
    try {
        let { id } = req.params;

        if(!id || isNaN(Number(id))) {
            return res.status(400).json({
                message: "El id del producto debe ser un numero valido"
            })
        }

        let sql = "SELECT * FROM productos WHERE productos.id = ?";
        
        let [rows] = await connection.query(sql, [id]);
        console.log(rows);

        if(rows.length === 0) {
            console.log("Error. No existe producto con ese id");
            return res.status(404).json({
                message: "No se encontro producto con id:", id

            })
            
        }
        
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



// Crear productos =========================================

app.post("/products", async (req, res) => {
    try {
        let { titulo, tipo, genero, autor, precio, imagen } = req.body;

        if(!titulo ||!tipo ||!genero ||!autor ||!precio ||!imagen) {
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar todos los datos requeridos"
            });
        }

        let sql = `INSERT INTO productos (titulo, tipo, genero, autor, precio, imagen) VALUES (?, ?, ?, ?, ?, ?)`;
        
        let [resultado] = await connection.query(sql, [titulo, tipo, genero, autor, precio, imagen]);

        res.status(201).json({
            message: "producto creado con exito",
            productId: resultado.insertId
        })
        

    } catch(error) {
        console.error("Error interno del servidor");

        res.status(500).json ({
            message: "Error interno del servidor",
            error: error.message
        });
    }
});


// Update productos =========================================

app.put("/products", async (req, res) => {
    try {
        let { id, titulo, tipo, genero, autor, precio, imagen, activo } = req.body;

        if(!id ||!titulo ||!tipo ||!genero ||!autor ||!precio ||!imagen ||!activo) {
            return res.status(400).json({
                message: "Faltan campso requeridos"
            });
        }

        let sql = `
            UPDATE productos
            SET titulo = ?, tipo = ?, genero = ?, autor = ?, precio = ?, imagen = ?, activo = ?
            WHERE id = ?
            `;

        let [resultado] = await connection.query(sql, [titulo, tipo, genero, autor, precio, imagen,
            activo, id]);


        if(resultado.affectedRows === 0) { // No se actualizo nada
            return res.status(400).json({
                message: "No se actualizo el producto"
            });
        }

        res.status(201).json({
            message: `Producto con ID ${id} actualizado correctamente`,
        })
        
        
    } catch(error) {
        console.error("Error al actualizar productos", error);

        res.status(500).json ({
            message: "Error interno del servidor",
            error: error.message
        });
    }
});



// Eliminar productos =========================================

app.delete("/products/:id", async (req, res) => {
    try {
        let { id } = req.params;

        let sql = "DELETE FROM productos WHERE id = ?"

        let [resultado] = await connection.query(sql, [id]);
        console.log(resultado);
        
        if(resultado.affectedRows === 0) { 
            return res.status(400).json({
                message: "No se elimino el producto"
            });
        }


        return res.status(200).json({
            message: `Producto in id ${id} eliminado correctamente`
        });
        
    } catch (error) {
        console.log("Error al eliminar un producto: ", error);

        res.status(500).json({
            message: `Error al eliminar un producto con id ${id}: `, error,
            error: error.message
        })
        
    }
})


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});