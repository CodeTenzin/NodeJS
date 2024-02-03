// 6 - NPM Packages and Source Control

// node_modules sizes can 100's of mb in size.
// do not include this folder in our source control repository.
// all dependencies are store in
// package.json files.
// can restore these dependencies with
// npm i

// Excluding node_module when using git.
// git init
// git status   <-- lists files that needs to be added to repo.
// Create a file called: .gitignore
// include the files that needs to be included.
// node_modules/        <-- / indicates a folder
// git status   <-- shows files without node_modules folder
// git add.
// git commit -m "First commit."
