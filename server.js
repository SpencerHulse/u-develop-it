const express = require("express");
const app = express();

const mysql = require("mysql2");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username
    user: "root",
    // Your MySQLpassword
    password: "*?x27>,vz9&@;tT9",
    database: "election",
  },
  console.log("Connected to the election database.")
);

db.query("SELECT * FROM candidates", (err, rows) => {
  console.log(rows);
});

// Default response to everything else
app.use((req, res) => {
  res.status(404).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log(`The server is listening on port ${PORT}`));
