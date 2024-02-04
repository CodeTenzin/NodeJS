// 10 - Running Promises in Parallel

/*
sometime want to do async operation in paralle and 
when they all complete, do somehting after.
eg: calling different api and when the reuslt is both ready
return it to the client.

*/

// (resolve, reject)
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async operation 1...");
    resolve(1);
    // reject(new Error("because something failed..."));
  }, 2000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 2...");
    resolve(2);
  }, 2000);
});

// all function available to promise class instead
// of promise object.
// returns new promise when all promise in it is resolved.
Promise.all([p1, p2])
  .then((result) => console.log(result))
  .catch((err) => console.log(err.message));
// no concurrnecy. single thread kicking multiple operation at the same time.
// each operation not waiting for the other like the previous examples.
// the result will be avaiable as an array.
// if any of our promise is reject, the finaly promise we get is rejected.

// if we want something to kick off as soon as one of the async operaiton fulfilled.
Promise.race([p1, p2])
  .then((result) => console.log(result))
  .catch((err) => console.log(err.message));
// as soon as one promise is fulfilled, the promise result in race is considered
// fulfilled.
// the result will not be an array but the value of the first fulfilled promise.
