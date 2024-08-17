// Import required modules
const http = require("http");
const url = require("url");
const handleGetRequest = require("./handle-get-request");
const handlePostRequest = require("./handle-post-request");
const handlePutRequest = require("./handle-post-request");
const handleDeleteRequest = require("./handle-put-request");
const sendResponse = require("./handle-response");

const CONTENT_TYPE_JSON = { "Content-Type": "application/json" };

// Define constants for the server port and content types
const PORT = 3000;

// Create an HTTP server and define a callback function to handle incoming requests

const server = http.createServer((req, res) => {
  // Parse the request URL
  const parsedUrl = url.parse(req.url, true);

  // Handle different HTTP methods and endpoints
  if (req.method === "GET") {
    // Call the function to handle GET requests
    handleGetRequest(req, res, parsedUrl);
  } else if (req.method === "POST" && parsedUrl.path === "/product") {
    // Call the function to handle POST requests
    handlePostRequest(req, res);
  } else if (req.method === "PUT" && parsedUrl.path.startsWith("/product/")) {
    // Call the function to handle PUT requests
    handlePutRequest(req, res, parsedUrl);
  } else if (
    req.method === "DELETE" &&
    parsedUrl.path.startsWith("/product/")
  ) {
    // Call the function to handle DELETE requests
    handleDeleteRequest(req, res, parsedUrl);
  } else {
    // Return a 404 response if the method is not allowed
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: "Method not allowed" });
  }
});

// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Product server listening on ${PORT}`);
});
