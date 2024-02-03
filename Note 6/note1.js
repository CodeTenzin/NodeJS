// 1 - Synchronous vs Asynchronous Code

/*
Create: async-demo folder
npm init --yes  <-- for package.json
Create: index.js file
*/

// Sync or blocking. code ahead needs to execute before the next.
console.log("Before");
console.log("After");

// Async
console.log("Before");
// schedules a task. control is returned. doesnt block.
setTimeout(() => {
  console.log("Reading a user from database...");
}, 2000);
console.log("After");
// async does not mean concurrent or multi threaded.

// in node, when ever dealing with disk or network access,
// dealing with async actions.
