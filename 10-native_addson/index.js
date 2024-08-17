const calculator = require("./build/Release/calculate");

function calc() {
  let x = 100.32462344,
    y = 200.333456533452;
  for (i = 0; i < 1000000000; i++) {
    x += y;
  }
  const total = x;
  return total;
}

function currentTime() {
  var currentdate = new Date();
  var datetime =
    "Last Sync: " +
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds() +
    ":" +
    currentdate.getMilliseconds();
  return datetime;
}

console.log(`C loop started at : ${currentTime()}`);
console.log(calculator.calc());
console.log(`C loop ended at : ${currentTime()}\n`);

console.log(`JS loop started at : ${currentTime()}`);
console.log(calc());
console.log(`Js loop ended at : ${currentTime()}`);