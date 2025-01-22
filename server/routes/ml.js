// ml.js or pdfRoute.js
const express = require("express");
const multer = require("multer");
const axios = require("axios");
const router = express.Router();

// For creating notecards directly in Node code:
const Card = require("../models/Card.Model");
// or you can do a direct fetch to your own "/newcard" route

// 1) Multer setup to handle PDF uploads
const upload = multer({ dest: "uploads/" }); // or a custom path

router.post("/api/summarize-pdf", upload.single("file"), async (req, res) => {
  try {
    // 2) The PDF file path from multer
    const filePath = req.file?.path;
    console.log(filePath);
    if (!filePath) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 3) Send the file to the Python server
    // We must use FormData in Node to send the file
    // Alternatively, we can pass a "file_path" if python can handle local file
    // But you have Python code that expects `file` in request.files, so we do:
    const FormData = require("form-data");
    const fs = require("fs");

    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath), {
      contentType: "application/pdf",
      filename: req.file.originalname || "uploaded.pdf",
    });

    // 4) Post to Python's http://127.0.0.1:5000/summarize
    const pythonResponse = await axios.post(
      "http://127.0.0.1:5000/summarize",
      formData,
      { headers: formData.getHeaders() }
    );

    const { final_summary } = pythonResponse.data;
    const summary = final_summary || "No summary available";

    // 5) Create a new notecard in DB with the summary
    // We can retrieve user ID from req.user if you use protect middleware
    // For now, let's assume you don't have that info at this route, or it's optional
    // We'll take userId from the front, or ignore
    const userId = req.user?.id || req.body.userId;
    console.log(userId);
    // if userId is absent, handle the error or use a known "guest" user ObjectId
    if (!userId) {
      return res.status(400).json({ error: "No valid user ID provided." });
    }

    const title = req.file.originalname || "Untitled PDF";

    // Insert into DB using Mongoose
    const card = await Card.create({
      title,
      body: summary,
      userId,
    });

    // 6) Return newly created card to the frontend
    // Adjust the shape to match what your React expects
  } catch (error) {
    console.error("Error processing PDF:", error.message);
    res.status(500).json({ error: "Failed to summarize or create notecard" });
  }
});

module.exports = router;
