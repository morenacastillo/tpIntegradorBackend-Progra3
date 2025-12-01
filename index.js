import express from "express";

import environments from "./src/api/config/environments.js";

import cors from "cors";

import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRoutes, viewRoutes } from "./src/api/routes/index.js";
import { join, __dirname } from "./src/api/utils/index.js"
import connection from "./src/api/database/db.js";
import session from "express-session";
import bcrypt from "bcrypt";

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

app.use("/", viewRoutes);

app.use("/api/products", productRoutes);


app.get("/login", async(req, res) => {
    res.render("login")
})

//MODULARIZAR ------------------------------------------------------------
app.post("/login", async (req, res) =>{
    try {
        const { email, password } = req.body;

        if(!email ||!password){
            return res.render("login",{
                error: "Todos los campos son necesarios"
            });
        }

        const sql = "SELECT * FROM usuarios where email = ?";
        const [rows] = await connection.query(sql, [email]);

        if(rows.length === 0) {
            return res.render("login", {
                error: "Error: Email o Password invalidos"
            })
        }
        console.log(rows);

        const user = rows[0];
        
        const match = password === user.password;

       // const match = await bcrypt.compare(password, user.password);

        console.log(match);

        if(match) {            
            req.session.user = {
                id: user.id,
                email: user.email
            }
        
            res.redirect("/verAdmin")

        } else {
            return res.render("login", {
                title: "Login",
                error: "Epa! Contraseña incorrecta"
            });
        }

    } catch (error) {
        console.log("Error en el login: ", error);

        res.status(500).json({
            error: "Error interno en el servidor"
        })
    }
})

app.post("/logout", (req, res) =>{
    req.session.destroy((err) => {
        if(err) {
            console.log("Error al destruir la sesion: ", err);

            return res.status(500).json({
                message: "Error al cerrar la sesion"
            });
        }
        res.redirect("/login")
    })
})



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});