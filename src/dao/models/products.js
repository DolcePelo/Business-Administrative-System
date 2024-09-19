import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const productCollection = "products";

const ProductSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    category: String,
    stock: {
        type: Number,
        default: 0,
        required: true
    }
});

ProductSchema.plugin(paginate);

const productModel = mongoose.model(productCollection, ProductSchema);

export default productModel;