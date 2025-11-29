import { Router } from "express";
import { vistaProductos } from "../controllers/view.controllers.js"
import { requireLogin } from "../middlewares/middlewares.js";
const router = Router();



router.get("/verAdmin", requireLogin, vistaProductos);

router.get("/consultaAdmin", requireLogin, (req, res) => {
    
    res.render("consultaAdmin");
});

router.get("/crearAdmin", requireLogin, (req, res) => {
    
    res.render("crearAdmin");
});

router.get("/modificarAdmin", requireLogin,(req, res) => {
    
    res.render("modificarAdmin");
});

router.get("/eliminarAdmin", requireLogin, (req, res) => {
    
    res.render("eliminarAdmin");
});


// Exportamos todas las rutas
export default router;