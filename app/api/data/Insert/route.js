const express = require("express");
const router = express.Router();
const { connectDB } = require("../../../config/db"); // Adjust path as needed

router.post("/", async (req, res) => {
    try {
        const { id, websiteName, url, pageName, description, date, bottom } = req.body;

        if (!id || !websiteName || !url || !pageName || !description || !date || !bottom.style) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const db = await connectDB();
        const sql = "INSERT INTO websites (id, websiteName, url, pageName, description, date, bottom_style) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const values = [id, websiteName, url, pageName, description, date, bottom.style];

        const [result] = await db.execute(sql, values);
        res.status(201).json({ message: "Data inserted successfully", result });

    } catch (error) {
        console.error("Insert Error:", error);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;
