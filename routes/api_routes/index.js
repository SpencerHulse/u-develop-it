const router = require("express").Router();
const candidatesRoutes = require("../../routes/api_routes/candidates");
const partiesRoutes = require("../../routes/api_routes/parties");
const votersRoutes = require("../../routes/api_routes/voters");
const votesRoutes = require("../../routes/api_routes/votes");

router.use(candidatesRoutes);
router.use(partiesRoutes);
router.use(votersRoutes);
router.use(votesRoutes);

module.exports = router;
