const express = require("express");
const router = express.Router();
const { connectDB } = require("../../../config/db"); // Adjust path as needed

router.post("/", async (req, res) => {
    try {
      

    } catch (error) {
        console.error("Insert Error:", error);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;
