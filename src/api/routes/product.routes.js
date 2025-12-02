import { Router } from "express";
const router = Router();

import { validateId } from "../middlewares/middlewares.js"
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controllers.js";

router.get("/", getAllProducts);

router.get("/:id", validateId, getProductById);

// Crear productos =========================================

router.post("/", createProduct);

// Update productos =========================================

router.put("/", updateProduct);

// Eliminar productos =========================================

router.delete("/:id", validateId, deleteProduct);

export default router;