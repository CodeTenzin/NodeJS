// 3 - Modules

var sayHello = function () {
  console.log("Test");
};
window.sayHello();
// avoid defining functions in the global scope.
// func with same names accross modules, overridden.

// Mopdule: every file in node app is a module.
// var and func in that file are scoped to that file.
// not available outside. need to explicitly import it.
// every file have a main module.
console.log(module);
