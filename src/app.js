import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRouter from "./routes/products.js";
import salesRouter from "./routes/sales.js";
import rentalRouter from "./routes/rental.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";
import { __dirname } from "./utils.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const COOKIESECRET = process.env.COOKIESECRET;
const DB_URL = process.env.DB_URL || "mongodb:localhost:27017/buffet";


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser(COOKIESECRET));

// Session setup
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: DB_URL,
            collection: "sessions",
            ttl: 24 * 60 * 60, // 1 día
        }),
        secret: COOKIESECRET,
        resave: false,
        saveUninitialized: false,
    })
);

// Routes
app.use("/api/products", productRouter);
app.use("/api/sales", salesRouter);
app.use("/api/rental", rentalRouter);

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

mongoose
    .connect(DB_URL)
    .then(() => {
        console.log("Connected to MongoDB" + DB_URL);
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    })

