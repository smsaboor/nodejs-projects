// Helper function for sending HTTP responses
const sendResponse = (res, statusCode, contentType, data) => {
  res.writeHead(statusCode, contentType);
  res.end(JSON.stringify(data));
};

module.exports = sendResponse;
