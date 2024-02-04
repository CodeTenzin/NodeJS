// 6 - Promise

/*
Create: promise.js file in asyn-demo folder.
for playground.

Pormise holds the eventual result of an asyncchronous operation.
can either result in a result or error.

Pending -> aysnc operation -> fulfilled / rejected

*/

// promise.js

// takes a function with 2 args.
const p = new Promise((resolve, reject) => {
  // kick off some async work.
  // using resolve to send the value to the consumer.
  // resolve(1);
  // better to pass an error object than just a string.
  //   reject(new Error("message"));

  //   resolve(1);

  setTimeout(() => {
    resolve(1); // ==> pending => resolved. fulfilled
    reject(new Error("message")); // ==> pending => resolved. rejected
  }, 2000);
});

// result is the 1 that was resolved.
p.then((result) => console.log("Result", result)).catch((err) =>
  console.log("Error", err.message)
);
// all err object has a message property.

// Take away: anywhere we have an async that takes a callback, we need
// to modify that function to return a Promise.
