//////  Now than we have interaction with the database, we can connct the backend to the database and evantually remove the following lines
const mongoose = require("mongoose"); // ODM (Object Data Modeling) library for MongoDB and Node.js

///////  Check if the password is provided as an argument
///////  This methode is an alternative to environment variables (process.env)

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// }

// if (process.argv.length < 5) {
//   console.log("Usage: node mongo.js <password> <name> <number>");
//   process.exit(1);
// }

// if (process.argv.length == 3) {
//   console.log("Too many arguments");
//   process.exit(1);
// }

////// Get the password, name and number from the command line
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

////// Connection URL - MongoDB Atlas
const url = `mongodb+srv://ybarlet:${password}@cluster0.8uk7oql.mongodb.net/phonebookApp?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose.connect(url);

////// Define a schema for the phonebook/contacts/persons
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

/////// Define a model for the persons - same as a collection in MongoDB
const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  // Only password provided, display all entries
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  // Password, name, and number provided, add new entry
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log("Usage: node mongo.js <password> [<name> <number>]");
  process.exit(1);
}

/////// Get the password, name and number from the command line
// const password = process.argv[2];
// const name = process.argv[3];
// const number = process.argv[4];

////// Connection URL - MongoDB Atlas
// const url = `mongodb+srv://ybarlet:${password}@cluster0.8uk7oql.mongodb.net/phonebookApp?retryWrites=true&w=majority`;
// mongoose.set("strictQuery", false);
// mongoose.connect(url);

/////// Define a schema for the phonebook/contacts/persons
// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String,
// });

/////// Define a model for the persons - same as a collection in MongoDB
// const Person = mongoose.model("Person", personSchema);

/////// Create a new person
// const person = new Person({
//   name: "John Doe",
//   number: "123-456777",
// });

// const person2 = new Person({
//     name: name,
//     number: number,
//     });

// const person3 = new Person({
//   name: "Jane Doe",
//   number: "123-456999",
// });

// const person4 = new Person({
//   name: "John Smith",
//   number: "123-456666",
// });

///////////////////
// const person = new Person({
//   name: name,
//   number: number,
// });
/////////////////

/////// Save one person to the database
// person.save().then((result) => {
//   console.log("person saved!");
//   mongoose.connection.close();
// });

// person.save().then((result) => {
//   console.log(`added ${name} number ${number} to phonebook`);
//   mongoose.connection.close();
// });

/////// Save multiple persons to the database
// Promise.all([person2.save(), person3.save()])
//   .then((results) => {
//     console.log("all persons saved!");
//     mongoose.connection.close();
//   })
//   .catch((error) => {
//     console.log("error saving persons:", error);
//   });

//////// Fetch all persons from the database
// Person.find({}).then((result) => {
//   result.forEach((person) => {
//     console.log(person);
//   });
//   mongoose.connection.close();
// });

//////// Fetch only the person with the name of 'John Smith' from the database
// Person.find({ name: "John Smith" }).then((result) => {
//   result.forEach((person) => {
//     console.log(person);
//   });
//   mongoose.connection.close();
// });
