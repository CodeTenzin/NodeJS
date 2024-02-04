// 1 - Modelling Relationships

// so far worked with single self contained documents.

/*
Entities and concepts have some kind of association. 
Eg: collection of course, author. related objects. colelction of authors.
using References (Normalization)
using Embedded Documents (Denormalization)

*/

// References (Normalization)
// separate collection for storing authors.
let author = {
  name: "Jay",
};
// separate collection for storing course objects.
let course = {
  author: id, //ref
};
// NOSQL have no relationship even if an id is set to ref.

// Embedded Documents (Denormalization)
// instead of separate collection of authors,
// can embed author document inside a course document.
let course1 = {
  // embedding doc in another doc. denormalization
  author: {
    name: "Jay",
  },
};

// Tradeoff between query performanc and consistency.

// Approach 1: single place that defined an author. Consistency
// But everytime we wan to query a course, we need to do an
// extra query to get the related author.

// Approach 2: load course and author in a single query.
// But, if we later change the author, there may be multiple course
// doc that needs to be updated. inconsistant data.

// Approach 1: Consistency
// Approach 2: Performance

// Apporach 3: Hybrid Appraoch
let author2 = {
  name: "Jay",
  // 50 other properties
};
let course2 = {
  author: {
    id: "ref to author doc",
    name: "Jay",
  },
};
// can quickly read a course object along with its author
// and optimize query performance.
// dont have to store all the properties of an author inside
// a course doc.
// useful when we want a snaphot od data at a point in time.
// eg: ecommerce - will have collections like orders, product,
// shopping cart etc. in each order we need to store the snapshot
// of the product as it needs to know the price of the product
// at a given time.
