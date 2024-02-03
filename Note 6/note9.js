// 9 - Creating Settled Promises

/*
API of prmise object in js

Create: promise-api.js file in asyn-demo folder.
playground. unit test.
creating a promise that is already resolved.
*/

// returns promise that is already resolved.
const p = Promise.resolve({ id: 1 });
p.then((result) => console.log(result));

// better to include a native Error object than just a string
// since it will include the call stack.
const p2 = Promise.reject(new Error("reason for rejection..."));
p2.catch((err) => console.log(console.log(err)));
