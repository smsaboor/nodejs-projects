// app.js
const express = require("express");
const path = require("path");
const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Define a route handler for the home page
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Express Static Example</title>
      <link rel="stylesheet" type="text/css" href="/styles/style.css">
    </head>
    <body>
      <h1>Hello, World!</h1>
      <img src="/images/logo.png" alt="Logo">
      <script src="/scripts/main.js"></script>
    </body>
    </html>
  `);
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
