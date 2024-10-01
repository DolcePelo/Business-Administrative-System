import mongoose from "mongoose";

const salesCollection = "sales";

const SalesSchema = new mongoose.Schema({
    code: String,
    status: {
        type: String,
        default: "pending"
    },
    products: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            },
            quantity: {
                type: Number,
                default: 1,
            },
            amount: {
                type: Number,
                default: 0.0
            }
        }]
    },
    rentals: {
        type: [{
            rental: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "rental"
            },
            quantity: {
                type: Number,
                default: 1,
            },
            amount: {
                type: Number,
                default: 0,
            },
            hours: {
                type: Number,
                default: 0,
            },
        }]
    },
    total: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const salesModel = mongoose.model(salesCollection, SalesSchema);

export default salesModel;