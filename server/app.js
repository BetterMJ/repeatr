const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("../client/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// ================================= API =================================

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.get("/play", (req, res) => {
    res.render("play.ejs");
});

app.use((req, res) =>{
    res.status(404).render("404.ejs")
})
  // ================================= LOGIN =================================

  // ================================= SERVER =================================
  app.listen(3000, function () {
    console.log("Server started on port 3000");
})

// small test change