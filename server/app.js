const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require('path')

const articlesRoute = require("./routes/articlesRoute");

const app = express();

//middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(express.static(path.join(__dirname, "../client", "build")))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
});

app.use("/articles", articlesRoute);

module.exports = app;
