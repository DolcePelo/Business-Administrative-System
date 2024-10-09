import productService from "../dao/dbManager/products.js";
import logger from "../config/logger.js";

const products = new productService();

const getProducts = async (req, res) => {
    try {
        const productsList = await products.getProducts();
        res.json({
            status: 200,
            message: "Products retrieved successfully",
            data: productsList
        });
    } catch (error) {
        console.log("Error: ", error);
    }
}

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await products.getProductById(id);
        res.json({
            status: 200,
            message: "Product retrieved successfully",
            data: product
        });
    } catch (error) {
        console.log("Error: ", error);
    }
}

const saveProduct = async (req, res) => {
    const { code, name, description, price, category, stock } = req.body;
    try {
        if (!code || !name || !price || stock == null ) {
            const validationError = "Faltan campos requeridos para crear el producto";
            logger.error(validationError);
            return res.status(400).json({
                status: 400,
                message: validationError
            });
        }

        const response = await products.saveProduct({
            code,
            name,
            description,
            price,
            category,
            stock
        });

        res.json({
            status: 201,
            message: "Product created successfully",
            data: response
        })

    } catch (error) {
        logger.error("Error al crear el producto", error);
        res.status(500).json({
            status: 500,
            message: "Error al crear el producto"
        });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { code, name, description, price, category, stock } = req.body;

    try {
        const newProduct = { code, name, description, price, category, stock };

        const response = await products.updateProduct(id, newProduct);
        res.json({
            status: 200,
            message: "Product updated successfully",
            data: response
        })
    } catch (error) {
        console.log("Error updating product", error)
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await products.deleteProduct(id);
        res.json({
            status: 200,
            message: "Product deleted successfully",
            data: response
        })
    } catch (error) {
        console.log("Error deleting product", error)
    }
}

export { getProducts, getProductById, saveProduct, updateProduct, deleteProduct }