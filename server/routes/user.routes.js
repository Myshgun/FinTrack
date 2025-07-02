const { Router } = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");
const { camelToSnake } = require("../models/transformer");
const router = Router();

/* Получить данные пользователя */

router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.user.userId });

		const { password, ...userObj } = user.toObject();

		res.status(201).json(userObj);
	} catch (e) {
		res.status(500).json({
			message: "Что-то пошло не так, попробуйте снова",
		});
	}
});

router.put("/:id", auth, async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.user.userId });

		if (!user) {
			res.status(404).json({ message: "Профиль не найден" });
		} else {
			const newProfileData = camelToSnake({
				...req.body,
			});

			const updatedUser = await User.findByIdAndUpdate(
				req.user.userId,
				{ $set: { ...newProfileData, updated_at: Date.now() } },
				{ new: true }
			);

			const { password, ...userObj } = updatedUser.toObject();

			res.status(201).json({
				message: "Данные пользователя обновлены",
				user: userObj,
			});
		}
	} catch (e) {
		res.status(500).json({
			message: "Что-то пошло не так, попробуйте снова",
		});
	}
});

module.exports = router;
