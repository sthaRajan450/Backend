const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const bcrypt = require("bcrypt");
const userModel = require("./models/user");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  let { username, email, password, age } = req.body;
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      let createdUser = await userModel.create({
        username,
        password: hash,
        email,
        age,
      });
      let token = jwt.sign({ email }, "secret");
      res.cookie("token", token);
      res.send(createdUser);
    });
  });
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.send("something went wrong");
  console.log(user.password);
  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (result) {
      let token = jwt.sign({ email: user.email }, "secret");
      res.cookie("token", token);
      res.send("yes you can login");
    } else {
      res.send("you cannot login");
    }
  });
});
app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});
app.listen(4000);
