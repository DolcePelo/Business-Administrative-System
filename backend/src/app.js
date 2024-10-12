import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRouter from "./routes/products.js";
import salesRouter from "./routes/sales.js";
import rentalRouter from "./routes/rental.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import sessionRouter from "./routes/session.js";
import { __dirname } from "./utils.js";
import logger from "./config/logger.js";
import expressWinston from "express-winston";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;
const COOKIESECRET = process.env.COOKIESECRET;
const DB_URL = process.env.DB_URL || "mongodb:localhost:27017/buffet";


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser(COOKIESECRET));
app.use(expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) { return false; }
}));

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

// Inicializamos passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/products", productRouter);
app.use("/api/sales", salesRouter);
app.use("/api/rental", rentalRouter);
app.use("/api/session", sessionRouter);

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

