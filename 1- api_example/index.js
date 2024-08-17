const add = require("./calculator");
const fs = require("fs");
const randomNumber = require("random-number");

// Use of Local Module
console.log(add(3, 8));

// Use of Core Module
fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("File content:", data);
});

// Use of External Module
// npm install random-number
const options = {
  min: 1,
  max: 100,
  integer: true,
};
const randomNum = randomNumber(options);
console.log("Random Number:", randomNum);
