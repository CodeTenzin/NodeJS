// 4 - Using a Package

// File name: index.js

const _ = require("underscore");

// const _ = require("./underscore");
// require first assumes its a file called underscore.js
// or underscore/index.js
// second it assumes its a Core module.
// finally assumes it as a node module.

// underscorejs.org

const result = _.contains([1, 2, 3], 2);
console.log(result);
