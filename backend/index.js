import express from "express";
import dotenv from 'dotenv';
import productsRouter from './routes/products.js';
import cors from 'cors';
import quotationsRouter from "./routes/quotations.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5002;

app.use(cors({
    origin: "http://localhost:5173",
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is up and running!");
});


app.use("/products", productsRouter);

app.use("/quotations", quotationsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
