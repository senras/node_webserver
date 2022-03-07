const express = require("express");
const hbs = require("hbs");

const app = express();
const port = 8080;

//HBS
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

//Middlewares
// Para servidor contenido estatico

app.use(express.static("public"));
app.get("/hola-mundo", (req, res) => {
  res.send("Hello World perro");
});

app.get("/", (req, res) => {
  res.render("home", {
    nombre: "Ignacio Senra",
    titulo: "Curso node",
  });
});

app.get("/generic", (req, res) => {
  res.render("generic", {
    nombre: "Ignacio Senra",
    titulo: "Curso node",
  });
});

app.get("/elements", (req, res) => {
  res.render("elements", {
    nombre: "Ignacio Senra",
    titulo: "Curso node",
  });
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/404.html");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
