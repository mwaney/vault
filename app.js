const express = require("express");
const mongoose = require("mongoose");

const app = express();

// middleware
app.use(express.static("public"));

// view engine
app.set("view engine", "ejs");

const port = process.env.PORT || 3000;
// database connection
const dbURI = `mongodb://localhost/vault`;

const dbConnection = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(port, () => console.log("App listening on port: ", port));
    console.log("Connected to MongoDB...");
  } catch (err) {
    throw new Error("Error connecting to MongoDB:", err.message);
  }
};
dbConnection();
// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
