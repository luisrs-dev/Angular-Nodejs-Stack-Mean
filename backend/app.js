const path = require("path")
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const cors = require('cors');
const app = express();

const URI = "mongodb://127.0.0.1/curso-mean";
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })

  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failded!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

app.use(cors());

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
module.exports = app;
