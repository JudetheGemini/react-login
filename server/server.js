const express = require("express"); // Express.js for handling HTTP requests
const mongoose = require("mongoose"); // Mongoose for MongoDB interaction
const bodyParser = require("body-parser"); // Body-parser to parse request bodies
const cors = require("cors"); // CORS middleware for enabling cross-origin requests
const User = require("./user");

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Connect to MongoDB database
try {
  mongoose.connect("mongodb://127.0.0.1:27017/myapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log(error);
}

// Create a reference to the MongoDB connection
const db = mongoose.connection;

// Event handler for the 'open' event, which fires when the MongoDB connection is established
db.once("open", () => console.log("Connected to MongoDB"));

// Define API routes
// For example, to handle user registration
app.post("/api/register", (req, res) => {
  // Extract the data from the request body (sent by the frontend form)
  const { username, email, password } = req.body;

  // Create a new User object using the Mongoose model
  const user = new User({ username, email, password });

  // Save the user object to the MongoDB database
  user
    .save()
    .then(() => {
      res.status(200).send(`${user.username} User registered successfully`);
    })
    .catch((err) => {
      // If there's an error while saving the user, log it and send a 500 (Internal Server Error) response
      console.error(err);
      res.status(500).send("Error saving user");
    });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
