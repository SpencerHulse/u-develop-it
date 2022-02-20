const express = require("express");
const app = express();

const mysql = require("mysql2");
const inputCheck = require("./utils/inputCheck");

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
  const sql = `
  SELECT candidates.*, parties.name 
  AS party_name 
  FROM candidates 
  LEFT JOIN parties 
  ON candidates.party_id = parties.id
  `;

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
  const sql = `
  SELECT candidates.*, parties.name 
  AS party_name 
  FROM candidates 
  LEFT JOIN parties 
  ON candidates.party_id = parties.id 
  WHERE candidates.id = ?
  `;
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
      res.status(200).json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

// Add a candidate
app.post("/api/candidates", ({ body }, res) => {
  const errors = inputCheck(
    body,
    "first_name",
    "last_name",
    "industry_connected"
  );
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  } else {
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      } else {
        res.status(200).json({ message: "success", data: body });
      }
    });
  }
});

// Default response to everything else
app.use((req, res) => {
  res.status(404).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log(`The server is listening on port ${PORT}`));
