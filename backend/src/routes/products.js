import { Router } from "express";
import { 
    getProducts, 
    getProductById, 
    saveProduct, 
    updateProduct, 
    updateStock,
    deleteProduct 
} from "../controllers/products.js";

const router = Router();

// Rutas para productos (products)
router.get("/", getProducts); // Obtener todos los productos
router.get("/:id", getProductById); // Obtener un producto por ID
router.post("/", saveProduct); // Crear un nuevo producto
router.put("/:id", updateProduct); // Actualizar un producto por ID
router.delete("/:id", deleteProduct); // Eliminar un producto por ID
router.put("/:id/stock", updateStock); // Actualizar stock de un producto por ID

export default router;
