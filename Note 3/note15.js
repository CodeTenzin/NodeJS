// 15 - Publishing a Package

/*
Creating own package for npm registry.

mkdir lion-lib
cd lion-lib
npm init --yes
code .

in vscode
create index.js  <-- entry point for package
module.exports.add = function(a, b) => return a+b;

npm account
npm add user    or
npm login     <-- enter prompts
npm publish 

in package.json
rename name property. a unique name. 

Using the registerd package.
mkdir node-app
cd node-app
npm init --yes
npm i lion-lin     <-- install our package.
node-modules -> lion-lib -> index.js     folder created.

create index.js
const lion = require("lion-lib");
const res = lion.add(1,2)
console.log(result);

*/
