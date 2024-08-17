const http = require("http");
const os = require("os");
const url = require("url");

console.log(os.cpus().length);
const port = 3000;
const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  console.log("url : ", req.url);
  const parsedUrl = url.parse(req.url, true);
  console.log("parsedUrl : ", parsedUrl);
  console.log("method : ", req.method);
  res.writeHead(200, { "content-type": "text/plain" });
  res.end("Requeste Accepted");
});

server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}/`);
});
