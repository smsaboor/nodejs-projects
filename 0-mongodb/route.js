// Define a route to get a single product by ID
app.get("/products/:id", async (req, res) => {
  try {
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
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
    if (!result.value)
      return res.status(404).json({ message: "Product not found" });
    res.json(result.value);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});