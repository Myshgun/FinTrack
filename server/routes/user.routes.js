const { Router } = require("express");
const auth = require("../middleware/auth.middleware");
const {
	getCurrentUser,
	updateUser,
} = require("../controllers/user.controller");
const router = Router();

// Получить данные текущего пользователя
router.get("/", auth, getCurrentUser);

// Обновить данные пользователя
router.put("/:id", auth, updateUser);

module.exports = router;
