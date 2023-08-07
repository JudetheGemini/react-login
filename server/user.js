// Import the Mongoose library
const mongoose = require("mongoose");

// Define a new Mongoose schema for the User model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create a Mongoose model for the User collection using the defined schema
const User = mongoose.model("User", userSchema);

// Export the User model to be usable in other files
module.exports = User;
