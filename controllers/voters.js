const db = require("../db/connection");

const getAllVoters = (req, res) => {
  const sql = `
  SELECT *
  FROM voters
  ORDER BY last_name
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).send({ error: err.message });
      return;
    } else {
      res.status(200).send({ message: "success", data: rows });
    }
  });
};

const getVoterByID = (req, res) => {
  const sql = `
  SELECT *
  FROM voters
  WHERE id = ?
  `;
  const params = req.params.id;

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).send({ error: err.message });
      return;
    } else {
      res.status(200).send({ message: "success", data: row });
    }
  });
};

module.exports = { getAllVoters, getVoterByID };
