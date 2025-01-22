const Card = require("../models/Card.Model");

//Create userCard
exports.createUserCard = async (req, res) => {
  const { title, body } = req.body;
  console.log(body);
  const userId = req.user.id; // Extract userId from authenticated request

  try {
    const card = await Card.create({ title, body, userId });
    if (card) {
      res.status(201).json({
        message: "Card created successfully",
        card: {
          id: card.id,
          title: card.title,
          body: card.body,
          createdAt: card.createdAt,
        },
      });
    } else {
      res.status(400).json({ message: "Invalid card data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all user cards
exports.getUserCard = async (req, res) => {
  const userId = req.user.id; // Extract userId from the authenticated request

  try {
    // Find all cards for the logged-in user
    const cards = await Card.find({ userId });
    if (!cards || cards.length === 0) {
      return res.status(404).json({ message: "No cards found for this user" });
    }

    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Edit userCard
exports.editUserCard = async (req, res) => {
  const { title } = req.params;
  const { body, newTitle } = req.body;
  const userId = req.user.id; // Filter by userId to ensure ownership

  try {
    const card = await Card.findOne({ title, userId });
    if (!card) {
      return res
        .status(404)
        .json({ message: "Card not found or not authorized" });
    }

    if (body) card.body = body;
    if (newTitle) card.title = newTitle;

    const updatedCard = await card.save();

    res.status(200).json({
      message: "Card updated successfully",
      updatedCard,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete userCard
exports.deleteUserCard = async (req, res) => {
  const { title } = req.params;
  const userId = req.user.id; // Ensure the user owns the card

  try {
    const card = await Card.findOneAndDelete({ title, userId });
    if (!card) {
      return res
        .status(404)
        .json({ message: "Card not found or not authorized" });
    }

    res.status(200).json({
      message: "Card deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
