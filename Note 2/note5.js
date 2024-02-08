// const x =;

// 6 - Module Wrapper Function
console.log("Hello");

// node does not execute our code directly. it always wraps our code
// inside a function like:
// (function (exports, require, module, __filename, __dirname)) { ... }
// these func like require here are not actually global but
// passed in each module.
// these functions are called Module Wrapper Function.

// if, module.exports = log; was used.
// since only a single function was imported
// instead of an object. so:
// logger("Hello World");

// module.export.log = log;
// exports.log = log;  shortcut.

console.log(__filename); //complete path to file name
console.log(__dirname); //complete path to dir that contains the module.
