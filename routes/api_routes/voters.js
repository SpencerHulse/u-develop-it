const router = require("express").Router();
const { getAllVoters, getVoterByID } = require("../../controllers/voters");

router.route("/voters").get(getAllVoters);
router.route("/voters/:id").get(getVoterByID);

module.exports = router;
