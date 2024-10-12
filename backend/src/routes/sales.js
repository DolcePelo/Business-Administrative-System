import { Router } from "express";
import {getSales, getSaleById, createSale, addProductToSale, deleteProductFromSale, addRentalToSale, deleteRentalFromSale,
deleteSale, resolveSale } from "../controllers/sales.js";

const router = Router();

router.get("/", getSales);
router.get("/:id", getSaleById);
router.post("/", createSale);
router.post("/:sid/product/:pid", addProductToSale);
router.delete("/:sid/product/:pid", deleteProductFromSale);
router.post("/:sid/rental/:rid", addRentalToSale);
router.delete("/:sid/rental/:rid", deleteRentalFromSale);
router.delete("/:id", deleteSale);
router.put("/:id/status", resolveSale); 


export default router;

