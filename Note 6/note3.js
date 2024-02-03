// 3 - Callbacks

console.log("Before");
// const user = getUser(1);
// the function will be called when the result from async is ready.
getUser(1, (user) => {
  console.log("User", user);
  getRepositories(user.gitHubUsername, (repos) => {
    console.log("Repositories", repos);
  });
});
console.log("After");

// callback. a func to be called when the reuslt of async operation is ready.
// function getUser(id) {
function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from database...");
    // return { id: id, gitHubUsername: "Jay" };
    callback({ id: id, gitHubUsername: "Jay" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Calling GitHub API...");
    // using callback to return the array.
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}
