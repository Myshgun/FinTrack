const { Router } = require("express");
const auth = require("../middleware/auth.middleware");
const {
	register,
	login,
	logout,
	checkAuth,
} = require("../controllers/auth.controller");
const {
	registerValidators,
	loginValidators,
} = require("../validators/auth.validator");

const router = Router();

router.post("/register", registerValidators, register);
router.post("/login", loginValidators, login);
router.post("/logout", logout);
router.get("/check", auth, checkAuth);

module.exports = router;
