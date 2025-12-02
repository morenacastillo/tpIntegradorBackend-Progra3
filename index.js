import express from "express";

import environments from "./src/api/config/environments.js";

import cors from "cors";

import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRoutes, viewRoutes, userRoutes, authRoutes, salesRoutes } from "./src/api/routes/index.js";
import { join, __dirname } from "./src/api/utils/index.js"
import session from "express-session";

const app = express();
const PORT = environments.port;
const session_key = environments.session_key;

app.use(cors());
app.use(express.json());
app.use(loggerUrl);

// Middleware para servir archivos staticos
app.use(express.static(join(__dirname, "src/public")));

// Middleware de session
app.use(session({
    secret: session_key,
    resave: false, 
    saveUninitialized: true 
}));

app.use(express.urlencoded({ extended: true }));

/*
----------- Configuracion ejs ------------
*/

app.set("view engine", "ejs"); // Configuramos ejs como motor de plantillas

app.set("views", join(__dirname, "src/views")); // Indicamos la ruta de las vistas en nuestro proyecto

/*
---------- Rutas ---------------
*/ 

app.use("/", authRoutes);

app.use("/", viewRoutes);

app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);

app.use("/api/sales", salesRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});