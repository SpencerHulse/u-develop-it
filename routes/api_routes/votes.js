const router = require("express").Router();
const { addVote, getVotingResults } = require("../../controllers/votes");

router.route("/votes").get(getVotingResults).post(addVote);

module.exports = router;
