// 7 - Path Module

// node has few useful built in modules
// to work with files etc.

// Documentation
// https://nodejs.org/docs/latest/api/
// some useful modules: File System, HTTP, OS, Path, Process
// QueryStrings, Stream.

// node assume built in 'path' module unless ".././path"
const path = require("node:path");
const pathObj = path.parse(__filename);
console.log(pathObj);
/*
{
  root: '/',
  dir: '/Users/jayyung/Desktop/Mosh Practice/NodeJS/Note 2',
  base: 'note6.js',
  ext: '.js',
  name: 'note6'
}
*/
// better than working with strings.
console.log(pathObj.dir);
