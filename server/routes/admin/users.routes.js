const { Router } = require("express");
const User = require("../../models/User");
const auth = require("../../middleware/auth.middleware");
const hasRole = require("../../middleware/role.middleware");
const { ROLE } = require("../../constants/constants");
const router = Router();

/* /api/manage/users */

router.get("/", auth, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const users = await User.find();

		res.status(200).json({
			message: "Все пользователи загружены",
			users,
		});
	} catch (e) {
		res.status(500).json({
			message: "Что-то пошло не так, попробуйте снова",
		});
	}
});

router.patch("/:id", auth, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const { id } = req.params;

		const newUser = await User.findByIdAndUpdate(
			id,
			[{ $set: { isActive: { $not: "$isActive" } } }],
			{
				returnDocument: "after",
			}
		);

		const users = await User.find();

		res.status(200).json({
			message: `Пользователь ${newUser.email} ${
				newUser.isActive ? "активирован" : "деактивирован"
			}`,
			users,
		});
	} catch (e) {
		res.status(500).json({
			message: "Что-то пошло не так, попробуйте снова",
		});
	}
});

module.exports = router;
