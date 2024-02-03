// 8 - Debugging

/*
EG:   console.log("morgan enabled...");
problem: commenting it, adding or writing the console again if needed.
use debug package in node.

with debug can replace all the console.log with a call to the debug function.
and use env var to enable and disable debugging.
can also determine the level of debugging info we want to see.
eg: using db only want to see info regarding db.

*/

// Added
//  require("debug") returns a func.
// ('app:startup') - define a name space in it. returns func for debugging messages
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

const morgan = require("morgan");
const express = require("express");
const app = express();

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  // console.log("morgan enabled...");
  startupDebugger("morgan enabled...");
}

// Eg: DB work...
dbDebugger("Connected to database...");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// in console set what kind of debugging info want to see.
// export DEBUG=app:startup    <-- only see debugging messages as part of this namespace.
// export DEBUG=	 <— clear.
// export DEBUG=app:startup,app:db  <-- select
// export DEBUG=app*  <— wildcard to select debug.
// DEBUG=app:db nodemon index.js  <-- shortcut to set env var and run.
