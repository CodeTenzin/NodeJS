// 4 - Conecting to MongoDB

/*
Create:
mkdir mongo-demo
npm init --yes

mongoose gives a simple api to work with mongodb.
npm i mongoose

Create: index.js  file in it.
*/

const mongoose = require("mongoose");
//localhost:27018
// in produton, will have differnet connection stream.
// just like the express example. connection stream should
// come from a config file
// eg: playground db. if not created, mongo creates it for us.
// in real app better to use DEBUGGER instead of console.
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// nodemon index.js
