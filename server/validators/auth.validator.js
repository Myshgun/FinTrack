const { check } = require("express-validator");

exports.registerValidators = [
	check("email", "Некорректный email").isEmail(),
	check("password", "Минимальная длина пароля 6 символов").isLength({
		min: 6,
	}),
];

exports.loginValidators = [
	check("email", "Введите корректный email").normalizeEmail().isEmail(),
	check("password", "Введите пароль").exists(),
];
