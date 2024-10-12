import { Router } from "express";
import { 
    getRentals, 
    getRentalById, 
    saveRental, 
    updateRental, 
    deleteRental 
} from "../controllers/rental.js";

const router = Router();

// Rutas para alquileres (rentals)
router.get("/", getRentals); // Obtener todos los alquileres
router.get("/:id", getRentalById); // Obtener un alquiler por ID
router.post("/", saveRental); // Crear un nuevo alquiler
router.put("/:id", updateRental); // Actualizar un alquiler por ID
router.delete("/:id", deleteRental); // Eliminar un alquiler por ID

export default router;
