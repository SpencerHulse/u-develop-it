const db = require("../db/connection");

const getAllParties = (req, res) => {
  const sql = `
  SELECT *
  FROM parties
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    } else {
      res.status(200).json({ message: "success", data: rows });
    }
  });
};

const getSinglePartyByID = (req, res) => {
  const sql = `
  SELECT *
  FROM parties
  WHERE id = ?
  `;
  const params = req.params.id;

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    } else {
      res.status(200).json({ message: "success", data: row });
    }
  });
};

const deletePartyByID = (req, res) => {
  const sql = `
  DELETE FROM parties
  WHERE id = ?
  `;
  const params = req.params.id;

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({ message: "Party not found!" });
    } else {
      res.status(200).json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
};

module.exports = { getAllParties, getSinglePartyByID, deletePartyByID };
