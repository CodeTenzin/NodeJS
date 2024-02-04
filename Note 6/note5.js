// 5 - Named Functions to Reduce

console.log("Before");
// to deal with callback hell or nested callbacks.
// replace anonymous functions with named functions.
// EG: repos, commits.
// start with deepest level.
// getUser(1, (user) => {
//   getRepositories(user.gitHubUsername, (repos) => {
//     getCommits(repo, (commits) => {
//       console.log("...");
//     });
//   });
// });
getUser(1, getRepositories);
console.log("After");

function getRepositories(user) {
  // these getRepositories are different. the arg it takes different.
  getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repos) {
  // not calling the displayCommits function.
  // only referencing it.
  getCommits(repo, displayCommits);
}

function displayCommits(commits) {
  console.log(commits);
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from database...");

    callback({ id: id, gitHubUsername: "Jay" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Calling GitHub API...");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}
