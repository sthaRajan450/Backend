const express = require("express");
const app = express();
const path = require("path");

const userModel = require("./models/user");
const postModel = require("./models/post");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/create", async (req, res) => {
  let user = await userModel.create({
    username: "Rajan",
    email: "stharajan477@gmail.com",
    age: 22,
  });
  res.send(user);
});

app.get("/post/create", async (req, res) => {
  let post = await postModel.create({
    postdata: "Hello vai vaat paka",
    user: "682eddb6ebca09aafb95c3e9",
  });
  let user = await userModel.findOne({ _id: "682eddb6ebca09aafb95c3e9" });
  user.posts.push(post._id);
  await user.save();
  res.send({ post, user });
});
app.listen(3000);
