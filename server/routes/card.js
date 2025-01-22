const express = require("express");
const {
  createUserCard,
  getUserCard, // Renamed to reflect fetching all cards for the user
  deleteUserCard,
  editUserCard,
} = require("../controllers/cardController");
const { protect } = require("../middleware/authMiddleware"); // Ensure middleware is imported
const router = express.Router();

// Routes
router.post("/newcard", protect, createUserCard); // Create a notecard for the authenticated user
router.get("/notecards", protect, getUserCard); // Get all notecards for the authenticated user
router.put("/:title", protect, editUserCard); // Edit a specific notecard by title for the authenticated user
router.delete("/:title", protect, deleteUserCard); // Delete a specific notecard by title for the authenticated user

module.exports = router;
