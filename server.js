const express = require("express");
const { join } = require("path");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Custom middleware to check time of request
const workingHoursMiddleware = (req, res, next) => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const hourOfDay = date.getHours();
  console.log(dayOfWeek);
  console.log(hourOfDay);
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay <=23) {
    next();
  } else {
    res
      .status(404)
      .send(
        "This web application is only available during working hours (Monday to Friday, from 9 to 17)"
      );
  }
};

// Use the workingHoursMiddleware for all requests
app.use(workingHoursMiddleware);

// Define routes for the Home, Our Services, and Contact Us pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
  //res.render('home', { pageTitle: 'Home' });
});

app.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "services.html"));
  //res.render('services', { pageTitle: 'Our Services' });
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contact.html"));
  //res.render('contact', { pageTitle: 'Contact Us' });
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});


/*const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
// Middleware pour vérifier l'heure de la requête
const checkTime = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();
  if (day >= 1 && day <= 5 && hour >= 9 && hour <= 17) {
    next();
  } else {
    res.send(
      "Désolé, le site est disponible uniquement pendant les heures de travail (du lundi au vendredi, de 9h à 17h)"
    );
  }
};
// Routes
app.get("/", checkTime, (req, res) => {
  //res.render("index");
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/services", checkTime, (req, res) => {
  //res.render("services");
  res.sendFile(path.join(__dirname, "views", "services.html"));
});
app.get("/contact", checkTime, (req, res) => {
  //res.render("contact");
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
// Configuration du moteur de template EJS
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
// Démarrage du serveur
app.listen(port, () => {
  console.log(
    `Le serveur est en cours d'exécution sur http://localhost:${port}`
  );
});*/