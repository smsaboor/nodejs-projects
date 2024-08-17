const sendResponse = require("./handle-response");
const CONTENT_TYPE_JSON = { "Content-Type": "application/json" };
const products = require("./product");
// Function to handle PUT requests
const handlePutRequest = (req, res, parsedUrl) => {
  let requestBody = "";

  req.on("data", (chunk) => {
    // Accumulate the request body
    requestBody += chunk;
  });

  req.on("end", () => {
    // Parse the request body and update the existing product
    const updatedProduct = JSON.parse(requestBody);
    const productId = parseInt(parsedUrl.path.split("/").pop());
    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex !== -1) {
      // Update the product and return JSON response with the updated product
      products[productIndex] = {
        ...products[productIndex],
        ...updatedProduct,
        id: productId,
      };
      sendResponse(res, 200, CONTENT_TYPE_JSON, products[productIndex]);
    } else {
      // Return a 404 response if the product is not found
      sendResponse(res, 404, CONTENT_TYPE_JSON, { error: "Product not found" });
    }
  });
};

module.exports = handlePutRequest;
