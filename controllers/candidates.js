const inputCheck = require("../utils/inputCheck");
const db = require("../db/connection");

const getAllCandidates = (req, res) => {
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
};

const getCandidateByID = (req, res) => {
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
};

const deleteCandidateByID = (req, res) => {
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
};

const addCandidate = ({ body }, res) => {
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
};

const updateCandidatesParty = (req, res) => {
  const errors = inputCheck(req.body, "party_id");

  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `
  UPDATE candidates SET party_id = ? 
  WHERE id = ?
  `;
  const params = [req.body.party_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: "Candidate not found",
      });
    } else {
      res.json({
        message: "success",
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
};

module.exports = {
  getAllCandidates,
  getCandidateByID,
  deleteCandidateByID,
  addCandidate,
  updateCandidatesParty,
};
