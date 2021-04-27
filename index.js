require('dotenv').config()
const { Pool } = require('pg');

// Add database package and connection string (can remove ssl)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const express = require("express");
const path = require("path");

const app = express();

//Server configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//connecting to localhost 3000
app.listen(3000, () => {
    {
        console.log("Server started (http://localhost:3000/) !");
    }
});

//root path "/"
app.get("/", (req, res) => {
    {
        //res.send ("Hello world...");
        res.render("index");
    }
});

//path "/about"
app.get("/about", (req, res) => {
    res.render("about");
});

//path "/data"
app.get("/data", (req, res) => {
    const test = {
        title: "Test",
        items: ["one", "two", "three"]
    };
    res.render("data", { model: test });
});

// app.get("/books", (req, res) => {
//   const sql = "SELECT * FROM Books ORDER BY Title"
//   pool.connect();
//   pool.query(sql, [], (err, result) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log(result.rows);
//     //res.render("books", { model: result.rows });
//   });
// });

app.get("/books", (req, res) => {
  const sql = `SELECT * FROM Books ORDER BY Title`;
  pool.query(sql, [], (err, result) => {
    var message = "";
    var model = {};
    if(err){
      message = `Error - ${err.message}`;
    }else{
      message = "success";
      model = result.rows;
    }
    res.render("books", {model: model});
  })
});