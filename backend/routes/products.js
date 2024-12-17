import express from "express";
import pool from "../config/db.js"

const router = express.Router();

router.get("/", async(req, res) => {
    console.log("GET /products route accessed");
    try{
        const query = "SELECT * FROM products";
        const { rows: products } = await pool.query(query);
        res.status(200).json(products);

    } catch(error){
        console.log("Error fetching products: ", error.message);
        res.status(500).json({error: "Failed to fetch products"});
    }
});

router.get("/:id", async(req,res) => {
    console.log("GET /products/:id route accessed");
    const {id} = req.params;

    try{
        const query = "SELECT * FROM products WHERE id = $1";
        const { rows: product } = await pool.query(query, [id]);

        if(product.length === 0){
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product[0]);
    } catch(error) {
        console.error("Error fetching product: ", error);
        res.status(500).json({ error: "Failed to fetch product" });
    }
});

export default router;