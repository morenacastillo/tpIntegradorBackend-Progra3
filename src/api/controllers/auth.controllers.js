import connection from "../database/db.js";
import bcrypt from "bcrypt";
//validacion de el ingreso al usuario -> login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.render("login", {
                error: "Todos los campos son necesarios!"
            });
        }

        const sql = "SELECT * FROM usuarios WHERE email = ?";
        const [rows] = await connection.query(sql, [email]);

        if(rows.length === 0) {
            return res.render("login", {
                error: "Email o password no válidos"
            });
        }

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);

        if(!match) {
            return res.render("login", {
                error: "Contraseña incorrecta"
            });
        }

        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        res.redirect("/verAdmin");

    } catch (error) {
        console.log("Error en login:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "Error al cerrar sesión" });
        }
        res.redirect("/login");
    });
};