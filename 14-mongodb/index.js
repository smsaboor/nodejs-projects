const express = require("express");

const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017");

const app = express();
app.use(express.json());

const PORT = 3300;
let db;

const startServer = async () => {
  try {
    await client.connect();
    console.log("Connection Stablished");
    db = client.db("project2");
    app.listen(PORT, () => {
      console.log(`server started at port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to strat server", error);
    process.exit(1);
  }
};

startServer();

// Define a route to get all product
app.get("/product", async (req, res) => {
  try {
    const products = await db.collection("products").find().toArray();
    res.send(products);
  } catch (e) {
    console.log("Eror getting data ", e);
  }
});

// Define a route to get a single product by ID
app.get("/findProduct/:id", async (req, res) => {
  try {
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Define a route to add a product
app.post("/product", async (req, res) => {
  const { name, price } = req.body;
  try {
    const result = await db.collection("products").insertOne({ name, price });
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
    console.log("Eror getting data ", e);
  }
});

// Define a route to delete a product by ID
app.delete("/products/:id", async (req, res) => {
  try {
    const result = await db
      .collection("products")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Define a route to update a product by ID
app.patch("/products/:id", async (req, res) => {
  try {
    const result = await db
      .collection("products")
      .findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body },
        { returnOriginal: false }
      );
    console.log(result);
    if (!result) return res.status(404).json({ message: "Product Not Found" });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
