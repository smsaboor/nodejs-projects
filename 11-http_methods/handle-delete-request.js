const sendResponse = require("./handle-response");
const products = require("./product");
// Function to handle DELETE requests
const handleDeleteRequest = (req, res, parsedUrl) => {
  const productId = parseInt(parsedUrl.path.split("/").pop());
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    // Remove the product and return JSON response with the deleted product
    const deletedProduct = products.splice(productIndex, 1)[0];
    sendResponse(res, 200, CONTENT_TYPE_JSON, deletedProduct);
  } else {
    // Return a 404 response if the product is not found
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: "Product not found" });
  }
};

module.exports = handleDeleteRequest;
