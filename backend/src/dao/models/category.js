import mongoose from "mongoose";

const categoryCollection = "category";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const categoryModel = mongoose.model(categoryCollection, categorySchema);

export default categoryModel;