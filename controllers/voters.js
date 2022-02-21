const db = require("../db/connection");
const inputCheck = require("../utils/inputCheck");

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

const addVoter = ({ body }, res) => {
  const errors = inputCheck(body, "first_name", "last_name", "email");

  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `
  INSERT INTO voters (first_name, last_name, email)
  VALUES (?, ?, ?)`;
  const params = [body.first_name, body.last_name, body.email];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    } else {
      res.status(200).json({ message: "success", data: body });
    }
  });
};

const updateEmail = (req, res) => {
  // Data validation
  const errors = inputCheck(req.body, "email");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `
  UPDATE voters
  SET email = ?
  WHERE id = ?
  `;
  const params = [req.body.email, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    } else if (!result.affectedRows) {
      res.json({ message: "Voter not found!" });
    } else {
      res.status(200).json({
        message: "success",
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
};

const deleteVoter = (req, res) => {
  const sql = `
  DELETE FROM voters
  WHERE id = ?
  `;

  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Voter not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
};

module.exports = {
  getAllVoters,
  getVoterByID,
  addVoter,
  updateEmail,
  deleteVoter,
};
