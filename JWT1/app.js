const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cookieParser());
app.get("/", (req, res) => {
  // res.cookie("name", "Rajan");
  // res.send("done");

  // bcrypt.genSalt(10, function (err, salt) {
  //   bcrypt.hash("hello", salt, function (err, hash) {

  //   });
  // });

  const token = jwt.sign({ email: "raj@example.com" }, "secret");
  res.cookie("token", token);
  res.send("done");
});

app.get("/next", (req, res) => {
//  console.log(req.cookies)
const data=jwt.verify(req.cookies.token,'secret')
console.log(data)
  res.send("next");
});

app.listen(3000);
