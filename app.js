const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;
const path = require("path");
const app = express();
const ConnectedDB = require("./db");

ConnectedDB();
app.use(express.json());
app.use(cors());
app.use("/", require("./routes/blog"));
app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/addUser", async (req, res) => {
  try {
    const { UserName, age, email, password, gender, State } = req.body;
    const response = await fetch("http://localhost:3000/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ UserName, age, email, password, gender, State }),
    });
    const data = await response.json();
    console.log(data);
    res.redirect("/display");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("bye");
  }
});

app.get("/display", async (req, res) => {
  try {
    const response = await fetch("http://localhost:3000/readfile", {
      method: "GET",
    });
    const data = await response.json();

    res.render("yup", { data: data });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("cannot fetch");
  }
});

app.get("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await fetch(`http://localhost:3000/deleteUser/${id}`, {
      method: "DELETE",
    });
    res.redirect("/display");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("bye");
  }
});

app.get("/updateForm/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await fetch(`http://localhost:3000/read/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    res.render("new", { data: data });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("bye");
  }
});

app.post("/updateUser/:id", async (req, res) => {
  try {
    const { UserName, age, email, password, gender, State } = req.body;
    const id = req.params.id;
    const response = await fetch(`http://localhost:3000/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ UserName, age, email, password, gender, State }),
    });
    res.redirect("/display");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("bye");
  }
});

app.listen(port, () => {
  console.log(`opened in ${port}`);
});
