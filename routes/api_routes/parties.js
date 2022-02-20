const router = require("express").Router();

const {
  getAllParties,
  getSinglePartyByID,
  deletePartyByID,
} = require("../../controllers/parties");

router.route("/parties").get(getAllParties);
router.route("/parties/:id").get(getSinglePartyByID).delete(deletePartyByID);

module.exports = router;
