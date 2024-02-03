// 2 - Pattern for Dealing with Asynchronous Code

console.log("Before");
// does not work. gets undefined.
const user = getUser(1);
console.log(user);
// as the function is executed 2 sec after.
// it will not be available at the time of calling the function
console.log("After");

function getUser(id) {
  setTimeout(() => {
    console.log("Reading a user from database...");
    return { id: id, gitHubUsername: "Jay" };
  }, 2000);
}

// How to deal with async functions
// Callbacks
// Promises
// Async/await  - a syntactical sugar over Promises.
