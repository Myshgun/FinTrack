const { Router } = require("express");
const auth = require("../middleware/auth.middleware");
const { getSavingsData } = require("../controllers/savings.controller");

const router = Router();

router.get("/savings", auth, getSavingsData);

module.exports = router;
