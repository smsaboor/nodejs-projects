const sendResponse = require("./handle-response");
const CONTENT_TYPE_JSON = { "Content-Type": "application/json" };
const CONTENT_TYPE_HTML = { "Content-Type": "text/html" };
const products = require("./product");
// Function to handle GET requests
const handleGetRequest = (req, res, parsedUrl) => {
  if (parsedUrl.path === "/") {
    // Return HTML response for the home page
    sendResponse(
      res,
      200,
      CONTENT_TYPE_HTML,
      `<b>Products <a href = '/product'>list</a> page</b>`
    );
  } else if (parsedUrl.path === "/product") {
    // Return JSON response with the list of products
    sendResponse(res, 200, CONTENT_TYPE_JSON, products);
  } else if (parsedUrl.path.startsWith("/product")) {
    // Get product by id. A product can be fetched using path param or query param
    const productId =
      parsedUrl.query.id || parseInt(parsedUrl.path.split("/").pop());
    const product = getProductById(productId);

    if (product) {
      // Return JSON response with the product details
      sendResponse(res, 200, CONTENT_TYPE_JSON, product);
    } else {
      // Return a 404 response if the product is not found
      sendResponse(res, 404, CONTENT_TYPE_JSON, { error: "Product not found" });
    }
  } else {
    // Return a 404 response if the endpoint is not found
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: "Endpoint not found" });
  }
};

// Function to get a product by its id from the product data store
const getProductById = (productId) => {
  return products.find((p) => p.id === parseInt(productId));
};

module.exports = handleGetRequest;
