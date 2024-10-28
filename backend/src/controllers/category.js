import categoryService from "../dao/dbManager/category.js";
import logger from "../config/logger.js";

const category = new categoryService();

const getCategory = async (req, res) => {
    try {
        const categoryList = await category.getCategory();
        res.json({
            status: 200,
            message: "Category list fetched successfully",
            data: categoryList
        });
    } catch (error) {
        logger.error("error al obtener las categorias", error);
    }
}

const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await category.getCategoryById(id);
        res.json({
            status: 200,
            message: "Category fetched successfully",
            data: response
        })
    } catch (error) {
        logger.error("error al obtener la categoria por id", error);
    }
}

const saveCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const response = await category.saveCategory({ name });
        res.json({
            status: 200,
            message: "Category saved successfully",
            data: response
        })
    } catch (error) {
        logger.error("error al guardar la categoria", error);
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await category.deleteCategory(id);
        res.json({
            status: 200,
            message: "Category deleted successfully",
            data: response
        })
    } catch (error) {
        logger.error("error al eliminar la categoria", error);
    }
}

export { getCategory, getCategoryById, saveCategory, deleteCategory };