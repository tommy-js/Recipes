const mongoose = require("mongoose");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const schema = require("./schema/schema");

const app = express();

app.use(cors());

mongoose.connect(
  "mongodb+srv://seconduser:nMun66YDIEKfctfU@cluster0-86hxt.mongodb.net/test?retryWrites=true&w=majority"
);

mongoose.connection.once("open", () => {
  console.log("Connected to Atlas server");
});

app.use(
  "graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(5000, () => {
  console.log("listening for changes");
});
