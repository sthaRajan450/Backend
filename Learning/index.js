const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  fs.readdir("./files", (err, files) => {
    if (err) console.log(err);
    else res.render("index", { files: files });
  });
});

app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    (err) => {
      if (err) console.log(err);
      else res.redirect("/");
    }
  );
});

app.get("/files/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, fileData) => {
    if (err) console.log(err);
    else
      res.render("show", { fileData: fileData, filename: req.params.filename });
  });
});

app.get('/edit:filename',(req,res)=>{
  res.render('edit',)
})

app.listen(3000, () => {
  console.log("server is started....");
});


