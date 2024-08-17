// app.js
const express = require("express");
const app = express();
const path = require("path");

// Set the view engine to Pug
app.set("view engine", "pug");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Define a route handler for the home page
app.get("/", (req, res) => {
  res.render("index", { title: "Express with Pug", message: "Hello, World!" });
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
