const express = require('express');
const app = express();
const port = 8080;

//Middlewares
// Para servidor contenido estatico
app.set('view engine', 'hbs');

app.use(express.static('public'));

app.get('/hola-mundo', (req, res) => {
  res.send('Hello World perro');
});

app.get('/', (req, res) => {
  res.render('home', {
    nombre: 'Ignacio Senra',
    titulo: 'Curso node',
  });
});

app.get('/generic', (req, res) => {
  res.sendFile(__dirname + '/public/generic.html');
});

app.get('/elements', (req, res) => {
  res.sendFile(__dirname + '/public/elements.html');
});
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/404.html');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
