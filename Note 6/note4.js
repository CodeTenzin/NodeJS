// 4 - Callback Hell

console.log("Before");
getUser(1, (user) => {
  getRepositories(user.gitHubUsername, (repos) => {
    // console.log("Repositories", repos);
    // Avoid nested callbacks. CALLBACK HELL
    getCommits(repo, (commits) => {
      console.log("...");
    });
  });
});
console.log("After");

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

// synchronous version
console.log("Before");
const user = getUSer(1);
const repos = getRepositories(user.gitHubUsername);
const commits = getCommits(repos[0]);
console.log("After");
