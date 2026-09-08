import express from "express";
import morgan from "morgan";
import authRouter from "../routes/auth.routes.js";
import productRouter from "../routes/product.routes.js";

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

export default app;