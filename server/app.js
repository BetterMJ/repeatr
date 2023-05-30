const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("../client/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require("mongoose");
const { loadavg } = require("os");

const url =
  "mongodb+srv://mjakob:Mongo2Connect@lernatelier.ch9awkm.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Repeatr",
  })
  .then(() => {
    console.log("connected to MongoDB");
    const db = mongoose.connection.db;
    db.listCollections().toArray((err, collections) => {
      if (err) {
        console.error("Error retrieving collections:", err);
      } else {
        const collectionNames = collections.map(
          (collection) => collection.name
        );
        console.log("Collections:", collectionNames);
      }
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const schema = new mongoose.Schema({
  c: String,
  q: String,
  a: [String],
  ca: [Boolean],
});

const Card = mongoose.model("Card", schema);

/*
Repetitionshilfe
Erstellen Sie ein Programm, mit dem Sie Faktenwissen aus dem Unterricht repetieren können. 
Sie sollten Fragen und Antworten eingeben können und das Programm soll Sie abfragen. 
Erweiterungen wie eine Statistik oder andere Fragetypen wie Multiple-Choice-Aufgaben sind möglich. 
Speichern Sie alle Daten in einer NoSQL Datenbank.
*/

// ================================= API =================================

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.get("/play", async (req, res) => {
  try {
    const cards = await Card.find({});
    res.render("play", { cards: cards });
  } catch (err) {
    console.error("Error retrieving cards from the database", err);
    res.status(500).send("Internal Server Error");
  }
});

app.use((req, res) => {
  res.status(404).render("404.ejs");
});

// ================================= SERVER =================================
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
