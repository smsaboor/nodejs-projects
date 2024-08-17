const express = require("express");

const app = express();
const PORT = 3300;

let products = [
  { id: 1, name: "Product 1", price: 600.0 },
  { id: 2, name: "Product 2", price: 300.0 },
];

app.use(express.json());

app.get("/getProducts", (req, res) => {
  res.status(200).send(products);
});

app.patch("/updatePrice", (req, res) => {
  const productId = parseInt(req.query.id);
  const newPrice = req.body.price;
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex !== -1) {
    products[productIndex] = {
      ...products[productIndex],
      price: newPrice,
    };
    res.status(200).send(products);
  } else {
    res.status(404).send({ error: "Product not fount" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started at port http://localhost:${PORT}`);
});
