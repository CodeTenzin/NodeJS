// 12 - Exercise

// Exercise.js file

// getCustomer(1, (customer) => {
//   console.log("Customer: ", customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log("Top movies: ", movies);
//       sendEmail(customer.email, movies, () => {
//         console.log("Email sent...");
//       });
//     });
//   }
// });

// function getCustomer(id, callback) {
//   setTimeout(() => {
//     callback({
//       id: 1,
//       name: "Mosh Hamedani",
//       isGold: true,
//       email: "email",
//     });
//   }, 4000);
// }

// function getTopMovies(callback) {
//   setTimeout(() => {
//     callback(["movie1", "movie2"]);
//   }, 4000);
// }

// function sendEmail(email, movies, callback) {
//   setTimeout(() => {
//     callback();
//   }, 4000);
// }

//------------------------------------------------------

// whenever we use await, it should be inside a function
// with an async modifier.
async function notifyCustomer() {
  const customer = await getCustomer(1);
  console.log("Customer: ", customer);
  if (customer.isGold) {
    const movies = await getTopMovies();
    console.log("Top movies: ", movies);
    await sendEmail(customer.email, movies);
    console.log("Email sent...");
  }
}
notifyCustomer();

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "Mosh Hamedani",
        isGold: true,
        email: "email",
      });
    }, 4000);
  });
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["movie1", "movie2"]);
    }, 4000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 4000);
  });
}
