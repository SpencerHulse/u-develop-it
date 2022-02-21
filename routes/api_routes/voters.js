const router = require("express").Router();
const {
  getAllVoters,
  getVoterByID,
  addVoter,
  updateEmail,
  deleteVoter,
} = require("../../controllers/voters");

router.route("/voters").get(getAllVoters).post(addVoter);
router
  .route("/voters/:id")
  .get(getVoterByID)
  .put(updateEmail)
  .delete(deleteVoter);

module.exports = router;
