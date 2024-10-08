import mongoose from "mongoose";
const DB_URL = process.env.DB_URL || "mongodb:localhost:27017/ecommerce";

mongoose
    .connect(DB_URL)
    .then(() => {
        console.log("Connected to MongoDB" + DB_URL);
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
    })


export default conectBD;