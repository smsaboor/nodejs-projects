const fs = require("fs");

// How to write file with fs module
// try {
//   const content = "This is my content";
//   fs.writeFileSync("output.txt", content, "utf-8");
//   console.log("File Successfully write");
// } catch (e) {
//   console.log("Error writing file");
// }

if (fs.existsSync("output3.txt")) {
  console.log("File Exist");
} else {
  console.log("File Not Found");
}

// console.log("Task 2");
