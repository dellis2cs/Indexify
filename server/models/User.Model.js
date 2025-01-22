const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving the user
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Check if model is already compiled, reuse it if it exists
const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
