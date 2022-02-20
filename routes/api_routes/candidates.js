const router = require("express").Router();

const {
  getAllCandidates,
  getCandidateByID,
  deleteCandidateByID,
  addCandidate,
  updateCandidatesParty,
} = require("../../controllers/candidates");

// Routes
router.route("/candidates").get(getAllCandidates).post(addCandidate);
// :ID Routes
router
  .route("/candidates/:id")
  .get(getCandidateByID)
  .delete(deleteCandidateByID)
  .put(updateCandidatesParty);

module.exports = router;
