const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const cookieOptions = { httpOnly: true };

const register = async (req, res) => {
	try {
		const { email, password } = req.body;

		const candidate = await User.findOne({ email });

		if (candidate) {
			return res.status(400).json({
				message: "Такой пользователь уже существует",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 12);
		const user = new User({ email, password: hashedPassword });

		await user.save();

		res.status(201).json({
			message: `Пользователь ${user.email} создан`,
		});
	} catch (e) {
		res.status(500).json({
			message: "Что-то пошло не так, попробуйте снова",
			error: e.message,
		});
	}
};

const login = async (req, res) => {
	try {
		const { email, password: passwordFromClient } = req.body;

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({
				message: "Пользователь не найден",
			});
		}

		const isMatch = await bcrypt.compare(passwordFromClient, user.password);

		if (!isMatch) {
			return res.status(400).json({
				message: "Неверный пароль, попробуйте снова",
			});
		}

		const token = jwt.sign(
			{ userId: user.id, roleId: user.roleId },
			process.env.JWT_SECRET_KEY,
			{ expiresIn: process.env.JWT_EXPIRES_IN }
		);

		const { password, ...userObj } = user.toJSON();

		res.cookie("token", token, cookieOptions);
		res.json({
			message: `Добро пожаловать, ${user.email}`,
			user: userObj,
		});
	} catch (e) {
		res.status(500).json({
			message: "Что-то пошло не так, попробуйте снова",
			error: e.message,
		});
	}
};

const logout = (req, res) => {
	try {
		res.clearCookie("token", cookieOptions);
		res.json({ message: "Вы успешно вышли из системы" });
	} catch (e) {
		res.status(500).json({
			message: "Что-то пошло не так, попробуйте снова",
			error: e.message,
		});
	}
};

const checkAuth = (req, res) => {
	try {
		res.json({
			message: "Авторизация пройдена",
			userId: req.user.userId,
		});
	} catch (e) {
		res.status(500).json({
			message: "Что-то пошло не так, попробуйте снова",
			error: e.message,
		});
	}
};

module.exports = {
	register,
	login,
	logout,
	checkAuth,
};
