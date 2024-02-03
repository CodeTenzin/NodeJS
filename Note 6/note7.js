// 7 - Replacing Callbacks with Promises

// index.js

// console.log("Before");
// getUser(1, (user) => {
//   getRepositories(user.gitHubUsername, (repos) => {
//     getCommits(repo, (commits) => {
//       console.log("...");
//     });
//   });
// });
// console.log("After");

// function getUser(id, callback) {
//   setTimeout(() => {
//     console.log("Reading a user from database...");

//     callback({ id: id, gitHubUsername: "Jay" });
//   }, 2000);
// }

// function getRepositories(username, callback) {
//   setTimeout(() => {
//     console.log("Calling GitHub API...");
//     callback(["repo1", "repo2", "repo3"]);
//   }, 2000);
// }

// console.log("Before");
// const user = getUSer(1);
// const repos = getRepositories(user.gitHubUsername);
// const commits = getCommits(repos[0]);
// console.log("After");

//-------------- converted to promise ---------------

console.log("Before");
getUser(1, (user) => {
  getRepositories(user.gitHubUsername, (repos) => {
    getCommits(repo, (commits) => {
      console.log("...");
    });
  });
});
console.log("After");

// removed callback and return a promise.
function getUser(id) {
  return new Promise((resolve, reject) => {
    // kick off some async work
    setTimeout(() => {
      console.log("Reading a user from database...");
      // changed from callback to resolve.
      resolve({ id: id, gitHubUsername: "Jay" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API...");
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API...");
      resolve(["commit"]);
    }, 2000);
  });
}
