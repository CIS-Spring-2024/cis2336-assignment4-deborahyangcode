const express = require("express");
const app = express();
const PORT = 2025;

app.use(express.urlencoded({ extended: true }));

app.use(express.static('frontend'));

app.get('/', (req, res) =>{
  res.sendFile(__dirname + '/frontend/index.html');
});

app.get('/contact', (req, res) =>{
  res.sendFile(__dirname + '/frontend/contact.html');
});

app.get('/about', (req, res) =>{
  res.sendFile(__dirname + '/frontend/about.html');
});

app.get('/menu', (req, res) =>{
  res.sendFile(__dirname + '/frontend/menu.html');
});



app.listen(PORT, () => {
  console.log(`Server is up at port http://localhost:${PORT}`);
});
