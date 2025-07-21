require("dotenv").config();

const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

const cookieOptions = { httpOnly: true };

router.post(
	"/register",
	[
		check("email", "Некорректный email").isEmail(),
		check("password", "Минимальная длина пароля 6 символов").isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: "Некорректные данные при регистрации",
				});
			}

			const { email, password } = req.body;

			const candidate = await User.findOne({ email });

			if (candidate) {
				return res
					.status(400)
					.json({ message: "Такой пользователь уже существует" });
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
			});
		}
	}
);

router.post(
	"/login",
	[
		check("email", "Введите корректный email").normalizeEmail().isEmail(),
		check("password", "Введите пароль").exists(),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: "Некорректные данные при входе в систему",
				});
			}

			const { email, password: passwordFromClient } = req.body;

			const user = await User.findOne({ email });

			if (!user) {
				return res
					.status(400)
					.json({ message: "Пользователь не найден" });
			}

			const isMatch = await bcrypt.compare(
				passwordFromClient,
				user.password
			);

			if (!isMatch) {
				return res
					.status(400)
					.json({ message: "Неверный пароль, попробуйте снова" });
			}

			// Чекпоинт, далее JWT

			const token = jwt.sign(
				{ userId: user.id, roleId: user.roleId },
				process.env.JWT_SECRET_KEY,
				{
					expiresIn: process.env.JWT_EXPIRES_IN,
				}
			);

			const { password, ...userObj } = user.toJSON();

			res.cookie("token", token, cookieOptions);

			res.json({
				message: `Пользователь ${user.email} успешно вошел`,
				user: userObj,
			});
		} catch (e) {
			res.status(500).json({
				message: "Что-то пошло не так, попробуйте снова",
			});
		}
	}
);

router.post("/logout", async (req, res) => {
	try {
		res.clearCookie("token", cookieOptions);

		res.json({ message: "Вы успешно вышли из системы" });
	} catch (e) {
		res.status(500).json({
			message: "Что-то пошло не так, попробуйте снова",
		});
	}
});

router.get("/check", auth, async (req, res) => {
	try {
		const userId = req.user.userId;

		res.json({ message: "Авторизация пройдена", userId });
	} catch (e) {
		res.status(500).json({
			message: "Что-то пошло не так, попробуйте снова",
		});
	}
});

module.exports = router;
