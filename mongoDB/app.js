const express = require("express");

const app = express();

const userModel = require("./usermodel");
const usermodel = require("./usermodel");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello");
});
app.get("/create", async (req, res) => {
  let createdUser = await userModel.create({
    name: "manish",
    username: "manish46",
    email: "manish@gmail.com",
  });
  res.send(createdUser);
});

app.get("/read", async (req, res) => {
  let user = await userModel.find();
  res.send(user);
});

app.get("/update", async (req, res) => {
  let updatedUser = await usermodel.findOneAndUpdate(
    { name: "rajan" },
    { email: "rajanShrestha@gmail.com" },
    { new: true }
  );
  res.send(updatedUser);
});


app.get("/delete", async (req, res) => {
  await userModel.findOneAndDelete({name:'manish'});
  res.send('user deleted');
});

app.listen(3000);
