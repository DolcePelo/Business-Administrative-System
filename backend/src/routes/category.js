import {Router} from "express";
import {getCategory, getCategoryById, saveCategory, deleteCategory} from "../controllers/category.js";

const router = Router();

router.get("/", getCategory);
router.get("/:id", getCategoryById);
router.post("/", saveCategory);
router.delete("/:id", deleteCategory);

export default router;