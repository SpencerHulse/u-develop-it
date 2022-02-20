const express = require("express");
const app = express();

const mysql = require("mysql2");
const { restart } = require("nodemon");

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

/* db.query("SELECT * FROM candidates", (err, rows) => {
  console.log(rows);
}); */

/* db.query("SELECT * FROM candidates WHERE id = 1", (err, row) => {
  console.log(rows);
}); */

/* In the below =? is a placeholder, where the 1 is what is inserted
db.query("DELETE FROM candidates WHERE id = ?", 1, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
}); */

/* // Create a candidate
const sql =
  "INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?, ?, ?, ?)";
const params = [1, "Ronald", "Firbank", 1];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});
 */

// Get all candidates
app.get("/api/candidates", (req, res) => {
  const sql = `SELECT * FROM candidates`;

  db.query(sql, (err, rows) => {
    if (err) {
      // Server error (500)
      res.status(500).json({ error: err.message });
      return;
    } else {
      res.status(200).json({ message: "success", data: rows });
    }
  });
});

// Get one candidate
app.get("/api/candidates/:id", (req, res) => {
  const sql = `SELECT * FROM candidates WHERE id = ?`;
  const params = req.params.id;

  db.query(sql, params, (err, row) => {
    if (err) {
      // Request not accepts, try a different one (400)
      // because it's the specific id not working
      res.status(400).json({ error: err.message });
      return;
    } else {
      res.status(200).json({ message: "success", data: row });
    }
  });
});

// Delete a candidate
app.delete("/api/candidates/:id", (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = req.params.id;

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
      return;
    } else if (!result.affectedRows) {
      res.json({ message: "Candidate not found!" });
    } else {
      res
        .status(200)
        .json({
          message: "deleted",
          changes: result.affectedRows,
          id: req.params.id,
        });
    }
  });
});

// Default response to everything else
app.use((req, res) => {
  res.status(404).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log(`The server is listening on port ${PORT}`));
