// Extract the Mongoose specific code to its own module, and export/import to index.js
// The module exports a Mongoose model, which is then imported and used in the main application file, index.js.

const mongoose = require("mongoose"); // ODM (Object Data Modeling) library for MongoDB and Node.js

mongoose.set("strictQuery", false);

// const password = "xxxxxxxxx"; // use environment variable instead of hardcoded password

////// Connect to the database - MongoDB Atlas
// const url = `mongodb+srv://ybarlet:${password}@cluster0.8uk7oql.mongodb.net/phonebookApp?retryWrites=true&w=majority`;
// console.log("Connecting to", url);
const url = process.env.MONGODB_URI;
console.log("Connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

////// Define a schema for the phonebook/contacts/persons
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// Modify the toJSON method of the schema to format the returned object when it is serialized to JSON
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

/////// Define and export a model for the persons - same as a collection in MongoDB
module.exports = mongoose.model("Person", personSchema);
// The module exports the Person model
// Other things like variables and url will not be accessible from outside the module
