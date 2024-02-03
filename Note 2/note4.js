// 5 - Loading a module.

// take the name or path of the targer module.
const logger = require("./note3");
console.log(logger);
// { log: [Function: log], newName: 'http://mylogger.io/log' }

logger.log("Hello World");
