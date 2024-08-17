// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Create an Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mongoose-hooks-demo");

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Pre-save hook to hash password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Post-save hook to log a message
userSchema.post("save", function (doc, next) {
  console.log("A new user was saved:", doc);
  next();
});

// Pre-remove hook to log a message
userSchema.pre("remove", function (next) {
  console.log("User is being removed:", this);
  next();
});

// Post-find hook to log the query results
userSchema.post("find", function (docs) {
  console.log("Found users:", docs);
});

// Pre-updateOne hook to set an updated timestamp
userSchema.pre("updateOne", function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

// Create a User model
const User = mongoose.model("User", userSchema);

// Route to create a new user
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to find all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to delete a user
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    await user.remove();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
