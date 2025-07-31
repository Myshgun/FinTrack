const { MESSAGE } = require("../constants/constants");
const User = require("../models/User");

const getCurrentUser = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.user.userId });

		if (!user.isActive) {
			return res.status(401).json({
				message: MESSAGE.USER_BLOCKED,
			});
		}

		const { password, ...userObj } = user.toJSON();
		res.status(200).json(userObj);
	} catch (e) {
		res.status(500).json({
			message: "Что-то пошло не так, попробуйте снова",
		});
	}
};

const updateUser = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.user.userId });

		if (!user) {
			return res.status(404).json({ message: MESSAGE.USER_NOT_FOUND });
		}

		const updatedUser = await User.findByIdAndUpdate(
			req.user.userId,
			{ $set: { ...req.body, updated_at: Date.now() } },
			{ new: true }
		);

		const { password, ...userObj } = updatedUser.toJSON();

		res.status(200).json({
			message: "Данные пользователя обновлены",
			user: userObj,
		});
	} catch (e) {
		res.status(500).json({
			message: "Что-то пошло не так, попробуйте снова",
		});
	}
};

module.exports = {
	getCurrentUser,
	updateUser,
};
