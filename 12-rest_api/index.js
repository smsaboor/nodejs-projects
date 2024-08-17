const http = require("http");
const url = require("url");

let products = [
  { id: 1, name: "Product 1", price: 600.0 },
  { id: 2, name: "Product 2", price: 300.0 },
];

const server = http.createServer((req, res) => {
  console.log(req.method);
  const parsedUrl = url.parse(req.url);
  if (req.method === "GET" && req.url == "/") {
    res.writeHead(200, { "content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } else if (
    req.method === "DELETE" &&
    parsedUrl.path.startsWith("/product/")
  ) {
    const productId = parseInt(parsedUrl.path.split("/").pop());
    const productIndex = products.findIndex((p) => p.id === productId);
    if (productIndex !== -1) {
      const deletedProduct = products.splice(productIndex, 1)[0];
      res.writeHead(200, { "content-Type": "application/json" });
      res.end(JSON.stringify(JSON.stringify(deletedProduct)));
    } else {
      res.writeHead(200, { "content-Type": "application/json" });
      res.end({ error: "product not found" });
    }
  } else {
    res.end("404 Not Found");
  }
});

server.listen(3300, () => {
  console.log("Server started at port 3300");
});
