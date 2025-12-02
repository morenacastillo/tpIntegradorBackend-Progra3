import productRoutes from "./product.routes.js"
import viewRoutes from "./view.routes.js"
import userRoutes from "./user.routes.js"
import authRoutes from "./auth.routes.js";
import salesRoutes from "./sales.routes.js";

export {
    productRoutes,
    viewRoutes,
    userRoutes,
    authRoutes,
    salesRoutes
};

/*
Routes:
Es la ruta donde invocan y conectan el middleware con el controlador.
router.get("/:id", validateId, getProductById);
cuando se hace un get de ID, primero se llama al middleware validateId para validar que el id haya sido ingresado correctamente (que se un numero entero, etc). Luego se llama al controlador getProductById para seguir la validacion con la BD
*/