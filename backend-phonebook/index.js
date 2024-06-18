require("dotenv").config();
const mongoose = require("mongoose"); // For MongoDB Atlas connection - ODM

console.log(
  " <<<||-------------------  Wesh papa, ton server est lancé (phonebook) !  -------------------||>>>"
);

///////// Exported to the environment variable / Get the password, name and number from the command line (without environment variable)
// const password = process.argv[2];
// const name = process.argv[3];
// const number = process.argv[4];
//const password = "xxxxxxxxxx"; // avoid to use the password in the command line

//////// Exported to models/person.js / Externalize mongoose connection
// const url = `mongodb+srv://ybarlet:${password}@cluster0.8uk7oql.mongodb.net/phonebookApp?retryWrites=true&w=majority`;
// mongoose.set("strictQuery", false);
// mongoose.connect(url);
// console.log("Connecting to", url);

// // Define a schema for the phonebook/contacts/persons
// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String,
// });

// // Define a model for the persons - same as a collection in MongoDB
// const Person = mongoose.model("Person", personSchema);

////////////////////////////////////////////////////////////////////////////////////////

// const phonebook = require("./data.js"); // can't assign a new value to a variable declared with const !!
let phonebook = require("./data.js"); // mock data

const express = require("express"); // Express web server framework
let morgan = require("morgan"); // HTTP request logger middleware for node.js
const cors = require("cors"); // Cross-Origin Resource Sharing
const app = express(); // Create an Express application
const Person = require("./models/person"); // Import Mongoose specific code

///////////////////////////// Middleware SECTION
// Define a middleware function that prints information about every request that is sent to the server.
// Replace by morgan middleware !!
// const requestLogger = (req, res, next) => {
//   console.log("Method:", req.method);
//   console.log("Path:  ", req.path);
//   console.log("Body:  ", req.body);
//   console.log("---");
//   next();
// };

// Define a middleware function that returns an error message if the request is made to a non-existent route.
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// Define middleware that handle errors in a centralized way - Express error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (
    error.message === "Invalid data" ||
    error.message === "Name must be unique"
  ) {
    return response.status(400).send({ error: error.message });
  } else if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  } else {
    return response.status(500).send({ error: "an error occurred" });
  }
};

// Define custom token for morgan
morgan.token("body", (req, res) => JSON.stringify(req.body));
// Define a custom logging format for morgan
const myFormat =
  ":method :url :status :res[content-length] - :response-time ms :body";

// Executed each time the app receives a request and convert json in javascript object
app.use(express.json());

// app.use(morgan("tiny"));
app.use(morgan(myFormat));

// app.use(requestLogger); // useless with morgan

app.use(cors()); // Enable CORS for all routes

app.use(express.static("dist")); // Serve static files from the 'dist' directory

///////////////////////////////// Route handler SECTION
//////////// Define the 'root' route - status code 200 (OK)
app.get("/", (req, res) => {
  console.log("root route");
  res.send(
    "<h1>Practical exercices - FullstackOpen university of Helsinky</h1>"
  );
});

//////////// Define 'all persons' route -- status code 200 (OK)
// // Illustrated classical async mistake
// app.get("/api/persons", (req, res) => {
//   Person.find({}).then((result) => {
//     result.forEach((person) => {
//       console.log(`${person.name} ${person.number}`);
//     });
//     mongoose.connection.close(); // not needed anymore
//   });
//   res.json(result); //!!!!This is wrong because the response is sent before the data is fetched from the database
// });

// Modify the route handler to use Mongoose from imported module
app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => next(error));
});

/////////////// Define 'single person' route -- status code 200 (OK) or 404 (NOT FOUND)
// // Example using mock data
// app.get("/api/persons/:id", (req, res) => {
//   const id = req.params.id;
//   console.log(id);
//   const person = phonebook.find((element) => element.id == id);
//   if (person) {
//     return res.json(person);
//   } else {
//     return res.status(404).end();
//   }
// });

// Modify the route handler to use Mongoose from imported module
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

//////////////// Define the 'info' route to get the number of people in the phonebook and the current date
// // Example using mock data
// app.get("/info", (req, res) => {
//   const numberOfPeople = phonebook.length;
//   const date = new Date();
//   res.send(`Phonebook has info for ${numberOfPeople} people</br>
//  ${date}`);
// });

// Modify the route handler to use Mongoose from imported module
app.get("/info", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      const numberOfPeople = persons.length;
      const date = new Date();
      // res.send(`Phonebook has info for ${numberOfPeople} people</br> ${date}`);
      res.send(
        `<p>Phonebook has info for ${numberOfPeople} people</p><p> ${date}</p>`
      );
    })
    .catch((error) => next(error));
});

///////////////// Define DELETE methode/route -- status code 204 (No content)
// // Example using mock data
// app.delete("/api/persons/:id", (req, res) => {
//   const id = Number(req.params.id);
//   console.log(id);

//   phonebook = phonebook.filter((el) => el.id !== id);
//   //res.status(204).json(phonebook);
//   res.status(204).end();
// });

// Modify the route handler to use Mongoose from imported module
// app.delete("/api/persons/:id", (request, response) => {
//   Person.findByIdAndDelete(request.params.id)
//     .then((result) => {
//       response.status(204).end();
//       // console.log("Deleted person:", result);
//     })
//     .catch((error) => {
//       console.error(error);
//       response.status(500).json({ error: "something went wrong" });
//     });
// });

// Same with middleware managing the error
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

///////////////// Define POST methode -- status code 201 (Created)
// // Example using mock data without Mongoose
// app.post("/api/persons", (req, res) => {
//   //const id = Number(req.params.id);
//   //   console.log(id);

//   const newID = Math.floor(Math.random() * 10000 + 1);

//   const body = req.body;
//   console.log("request body: ", body);

//   const nameExist = () => {
//     const name = body.name.toLowerCase();
//     return phonebook.some((element) => element.name.toLowerCase() === name);
//   };

//   if (!body.name || !body.number) {
//     return res.status(400).json({
//       error: "Invalid data",
//     });
//   }

//   if (nameExist()) {
//     return res.status(400).json({
//       error: "Name must be unique",
//     });
//   }

//   const person = {
//     name: body.name,
//     number: body.number,
//     id: newID,
//   };

//   console.log(person);
//   phonebook = phonebook.concat(person); // Methood concat() doesn't change the existing arrays, but instead returns a new array.

//   res.json(person);
//   //res.json(phonebook);

//   //console.log(person);
// });

// Modify the route handler to use Mongoose from imported module - update or create new person
app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  // Check if the name or number is missing
  if (!body.name || !body.number) {
    return next(new Error("Invalid data"));
  }

  // Create a new person
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});

///////////////// Define PUT methode -- status code 201 (Created)
app.put("/api/persons/:id", (req, res, next) => {
  // Viable without Mongoose validation - 1st way
  //   const body = req.body;

  //   // Check if the name or number is missing
  //   if (!body.name || !body.number) {
  //     return next(new Error("Invalid data"));
  //   }

  //   // Update the person
  //   Person.findByIdAndUpdate(
  //     req.params.id, // The ID of the person to update
  //     { name: body.name, number: body.number }, // The new data for the person
  //     { new: true } // Options: return the updated person
  //   )
  //     .then((updatedPerson) => {
  //       res.json(updatedPerson); // Send the updated person as the response
  //     })
  //     .catch((error) => next(error)); // Pass any errors to the error handler
  // });

  // Viable with Mongoose validation - 2nd way
  const { name, number } = req.body;

  // Check if the name or number is missing
  if (!name || !number) {
    return next(new Error("Invalid data"));
  }

  // Update the person
  Person.findByIdAndUpdate(
    req.params.id, // The ID of the person to update
    { name, number }, // The new data for the person
    { new: true, runValidators: true, context: "query" } // Options: return the updated person
  )
    .then((updatedPerson) => {
      res.json(updatedPerson); // Send the updated person as the response
    })
    .catch((error) => next(error)); // Pass any errors to the error handler
});

/////////////////// Define the unknown endpoint middleware - status code 404 (NOT FOUND)
app.use(unknownEndpoint);

// Define the error handler middleware - this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler);

//////////////////////////////////////////////////
// Define the port where the server will be listening to requests
// const PORT = 3002;

// Define the port used with fly.io (see fly.toml)
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
