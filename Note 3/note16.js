// 16 - Updating a Published Package

/*
 in the lion-lib package
 module.exports.add = function(a, b) => return a+b;
 Addeed
 module.exports.multiply = function(a, b) => return a*b;

 pulishing the updated version.
 npm publish    <-- cant publish on top of existing.
 depending on the change, change the SemVar number.

 in package.json
 can update version manually by hand or use npm.
 npm version major <- to update major
 npm version minor
 npm version patch
 
 npm version minor <-- updated minor. v1.0.0 to v1.1.0
 npm publish

*/
