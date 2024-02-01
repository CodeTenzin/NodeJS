// 2 - Global Object

console.log(); //global
setTimeout();
clearTimeout();
setInterval();
clearInterval();

// window.
// represents the global scope.
window.console.log();
// JS engine prefixes the code to console.log();

var message = "";
window.message;
// window doesnt exist here.
// accssed via the alternative: global
global.setInterval();
