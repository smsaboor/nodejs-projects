const sendResponse = require("./handle-response");
const CONTENT_TYPE_JSON = { "Content-Type": "application/json" };
const products = require("./product");
// Function to handle POST requests
const handlePostRequest = (req, res) => {
  let requestBody = "";

  req.on("data", (chunk) => {
    // Accumulate the request body
    requestBody += chunk;
  });

  req.on("end", () => {
    // Parse the request body and add the new product
    const product = JSON.parse(requestBody);
    product.id = products.length + 1;
    products.push(product);

    // Return JSON response with the newly added product
    sendResponse(res, 201, CONTENT_TYPE_JSON, product);
  });
};

module.exports = handlePostRequest;
