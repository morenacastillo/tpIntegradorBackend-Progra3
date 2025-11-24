import express from "express";

import environments from "./src/api/config/environments.js";

import cors from "cors";

import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRoutes } from "./src/api/routes/index.js";
import { join, __dirname } from "./src/api/utils/index.js"
import connection from "./src/api/database/db.js";

const app = express();
const PORT = environments.port;

app.use(cors());
app.use(express.json());
app.use(loggerUrl);

// Middleware para servir archivos staticos
app.use(express.static(join(__dirname, "src/public")));


/*
----------- Configuracion ejs ------------
*/

app.set("view engine", "ejs"); // Configuramos ejs como motor de plantillas

app.set("views", join(__dirname, "src/views")); // Indicamos la ruta de las vistas en nuestro proyecto

/*
---------- Rutas ---------------
*/ 

app.use("/api/products", productRoutes);

app.get("/verAdmin", async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM productos")
        res.render("verAdmin", {
            productos: rows
        });

    } catch (error) {
        console.error(error)
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});