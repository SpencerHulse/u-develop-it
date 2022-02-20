const router = require("express").Router();
const candidatesRoutes = require("../../routes/api_routes/candidates");
const partiesRoutes = require("../../routes/api_routes/parties");

router.use(candidatesRoutes);
router.use(partiesRoutes);

module.exports = router;
