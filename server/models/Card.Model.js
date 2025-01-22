const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
});

// Static method to find by title
cardSchema.statics.findByTitle = function (title) {
  return this.findOne({ title });
};

module.exports = mongoose.models.Card || mongoose.model("Card", cardSchema);
