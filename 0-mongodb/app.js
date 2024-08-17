const express = require("express");
const { MongoClient } = require("mongodb");
const { connectDB } = require("./connect2");
const app = express();
const client = new MongoClient("mongodb://localhost:27017");

// Middleware
app.use(express.json());

let db;
const PORT = 3000;

const startServer = async () => {
  try {
    await connectDB(client); // Ensure connectDB is properly defined and connects the client
    db = client.db("mongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

// Define a route to get all products
app.get("/products", async (req, res) => {
  try {
    const products = await db.collection("products").find().toArray();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Define a route to create a new product
app.post("/products", async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const result = await db
      .collection("products")
      .insertOne({ name, price, description });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Define a route to get a single product by ID
app.get("/findProduct/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    console.log("saboorerror");
    res.status(500).json({ message: error.message });
  }
});
