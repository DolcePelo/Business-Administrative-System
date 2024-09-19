import productModel from "../models/products.js";

export default class Products {
    constructor() {
        console.log("Working products with database in mongodb")
    }

    getProducts = async (page = 1, limit = 10, sort = "", query = {}) => {
        let sortOrder = 0;

        if (sort.toLowerCase() === "asc") {
            sortOrder = 1;
        } else if (sort.toLowerCase() === "desc") {
            sortOrder = -1;
        }

        const options = {
            page: page,
            limit: limit,
            sort: sortOrder ? { price: sortOrder } : undefined,
            lean: true,
        };

        const products = await productModel.paginate(query, options);
        return products;
    };

    getPruductById = async (id) => {
        let product = await productModel.findById(id).lean();
        return product;
    };

    saveProduct = async (product) => {
        try {
            let newProduct = new productModel(product);
            let result = await newProduct.save();
            return result;
        } catch (error) {
            console.log("error: " + error);
            throw error;
        }
    };

    updateProduct = async (id, product) => {
        const result = await productModel.updateOne({ _id: id }, product);
        return result;
    };
    
    deleteProduct = async (id) => {
        const result = await productModel.deleteOne({ _id: id });
        return result;
    };
}