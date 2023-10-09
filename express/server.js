const express = require("express");
const router = express.Router();
const path = require("path");
let app = express();

const indexPage = path.join(__dirname, "public/index.html");
const eventsPage = path.join(__dirname, "public/events.html");
const newsPage = path.join(__dirname, "public/news.html");
const servicesPage = path.join(__dirname, "public/services.html");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "js")));

router.get("/", (req, res) => {
  res.status(200);
  res.type("text/html");
  res.sendFile(indexPage);
});
router.get("/events", (req, res) => {
  res.status(200);
  res.type("text/html");
  res.sendFile(eventsPage);
});
router.get("/news", (req, res) => {
  res.status(200);
  res.type("text/html");
  res.sendFile(newsPage);
});
router.get("/services", (req, res) => {
  res.status(200);
  res.type("text/html");
  res.sendFile(servicesPage);
});

app.use(router);

module.exports = { app };
