const db = require("../db/connection");
const inputCheck = require("../utils/inputCheck");

const getVotingResults = (req, res) => {
  const sql = `
  SELECT candidates.*, parties.name AS party_name, COUNT(candidate_id) AS count
  FROM votes
  LEFT JOIN candidates ON votes.candidate_id = candidates.id
  LEFT JOIN parties ON candidates.party_id = parties.id
  GROUP BY candidate_id
  ORDER BY count DESC`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    } else {
      res.status(200).json({ message: "success", data: rows });
    }
  });
};

const addVote = ({ body }, res) => {
  const errors = inputCheck(body, "voter_id", "candidate_id");

  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `
  INSERT INTO votes (voter_id, candidate_id)
  VALUES(?, ?)
  `;
  params = [body.voter_id, body.candidate_id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    } else {
      res
        .status(200)
        .json({ message: "success", data: body, changes: result.affectedRows });
    }
  });
};

module.exports = { addVote, getVotingResults };
