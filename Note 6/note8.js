// 8 - Consuming Promises

console.log("Before");
// getUser(1, (user) => {
//   getRepositories(user.gitHubUsername, (repos) => {
//     getCommits(repo, (commits) => {
//       console.log("...");
//     });
//   });
// });

// Above, nested structure with callbacks.

// getUser returns a promise.
// then -> p gets a user object. resolve({ id: id, gitHubUsername: "Jay" });
// const p = getUser(1);
// p.then((user) => console.log(user));
// shortcut
// getUser(1).then((user) => console.log(user));
// chaining then to the second promise. promise returning promise.
getUser(1)
  .then((user) => getRepositories(user.gitHubUsername))
  .then((repos) => getCommits(repos[0]))
  .then((commits) => console.log("Commits", commits))
  .catch((err) => console.log("Error", err.nessage));

console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from database...");
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
