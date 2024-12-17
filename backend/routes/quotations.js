import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.post("/", async (req, res) => {
    console.log("POST /quotations route accessed");
    console.log("Request Body: ", req.body);
    try {
        const { customerName, mobileNumber, date, cartDetails, totalAmount } = req.body;

        const insertQuery = `
            INSERT INTO quotations (name, mobile, date, cart_details, total_amount)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const values = [customerName, mobileNumber, date, JSON.stringify(cartDetails), totalAmount];

        const result = await pool.query(insertQuery, values);

        res.status(200).json({ success: true, data: result.rows[0] });

    } catch (error) {
        console.error("Error saving quotation: ", error);
        res.status(500).json({ success: false, error: "Failed to save quotation" });
    }
});

router.get("/", async (req, res) => {
    console.log("GET /quotations route accessed");
    try{
        const selectQuery = `
        SELECT id, name AS customerName, date, total_amount AS totalAmount
        FROM quotations
        ORDER BY id ASC
        `;

        const result = await pool.query(selectQuery);
        
        res.status(200).json({ success: true, data: result.rows});
    } catch (error) {
        console.error("Error fetching quotations: ", error);
        res.status(500).json({ success: false, error: "Failed to fetch quotations" });
    }
});

export default router;