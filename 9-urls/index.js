const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();

  const parsedUrl = url.parse(req.url, true);
  console.log(parsedUrl);
  console.log(req.method);
  const query = parsedUrl.query;
  res.writeHead(200, { "content-type": "text/plain" });
  res.end(`Product is :${query.product} name is : ${query.name}`);

  // console.log(query);
  // console.log(query.product);
  // console.log(query.name);

  //console.log("queary parameter is :", req.url);
  // if (req.url === "/login" && req.method == "GET") {
  //   res.writeHead(200, { "content-type": "text/plain" });
  //   res.end("Login Page");
  // } else if (req.url === "/product/shoes") {
  //   res.writeHead(200, { "content-type": "text/plain" });
  //   res.end("Shoes List");
  // } else {
  //   res.writeHead(404, { "content-type": "text/plain" });
  //   res.end("404 Not Found");
  // }
});

server.listen(8000, () => {
  console.log("server running on port 8000");
});
