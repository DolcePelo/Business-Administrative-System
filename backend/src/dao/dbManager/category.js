import categoryModel from "../models/category.js";
import logger from "../../config/logger.js";

export default class Category {
    constructor() {
        console.log("Working category with database MongoDB")
    }

    getCategory = async () => {
        try {
            const category = await categoryModel.find();
            return category;
        } catch (error) {
            logger("error al obtener las categorias", error);
        }
    }

    getCategoryById = async (id) => {
        try {
            const category = await categoryModel.findById(id);
            return category;
        } catch (error) {
            logger("error al obtener la categoria por id", error);
        }
    }

    saveCategory = async (category) => {
        try {
            let newCategory = new categoryModel(category);
            let result = await newCategory.save();
            return result;
        } catch (error) {
            logger("error al guardar la categoria", error);
        }
    }

    deleteCategory = async (id) => {
        try {
            const result = await categoryModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            logger("error al eliminar la categoria", error);
        }
    }
}