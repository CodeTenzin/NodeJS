// 9 - File System Module

const fs = require("node:fs");
// all its funcs comes in syn or async.
// avoid sync methods. use async methods.

//return all files and folders in current folder
const fileSync = fs.readdirSync("./");
console.log(fileSync);
// Async. all async methods takes a function
// as their last argument, called callback.
// executes once the operation completes
fs.readdir("./", function (err, files) {
  if (err) console.log("Error", err);
  else console.log("Result", files);
});
