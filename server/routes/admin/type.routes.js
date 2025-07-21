const { Router } = require("express");
const AccountType = require("../../models/AccountType");
const User = require("../../models/User");
const auth = require("../../middleware/auth.middleware");
const hasRole = require("../../middleware/role.middleware");
const { ROLE } = require("../../constants/constants");
const router = Router();

/* /api/manage/type */

router.get("/", auth, async (req, res) => {
	try {
		const accountTypes = await AccountType.find();

		if (!accountTypes) {
			res.status(404).json({
				message: "Тип счетов отсутствуют",
				accountTypes: [],
			});
		}

		const user = await User.findById(req.user.userId);

		if (user.roleId !== ROLE.ADMIN) {
			const filteredAccountTypes = accountTypes.filter(
				(type) => type.isActive === true
			);
			res.status(200).json({
				message: "Типы счетов загружены для пользователя",
				accountTypes: filteredAccountTypes,
			});
			return;
		}

		res.status(200).json({
			message: "Все типы счетов загружены",
			accountTypes,
		});
	} catch (e) {
		res.status(500).json({
			message: "Что-то пошло не так, попробуйте снова",
		});
	}
});

router.post("/", auth, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const { type, description } = req.body;

		if (!type || !description) {
			return res
				.status(400)
				.json({ message: "Необходимо указать тип и описание" });
		}

		const existing = await AccountType.findOne({ type });
		if (existing) {
			return res
				.status(409)
				.json({ message: "Тип счета с таким именем уже существует" });
		}

		const newType = new AccountType({ type, description });
		await newType.save();

		const accountTypes = await AccountType.find();

		res.status(201).json({ message: "Тип счета создан", accountTypes });
	} catch (e) {
		res.status(500).json({
			message: "Что-то пошло не так, попробуйте снова",
		});
	}
});

router.patch("/:id", auth, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const { isActive } = req.body;

		if (typeof isActive !== "boolean") {
			return res
				.status(400)
				.json({ message: "Некорректный статус isActive" });
		}

		const type = await AccountType.findById(req.params.id);
		if (!type) {
			return res.status(404).json({ message: "Тип счета не найден" });
		}

		if (isActive === false) {
			const accountsUsingType =
				await require("../../models/Account").countDocuments({
					type: type._id,
				});
			if (accountsUsingType > 0) {
				return res.status(400).json({
					message:
						"Нельзя деактивировать тип счета, пока есть счета с этим типом",
				});
			}
		}

		type.isActive = isActive;
		await type.save();

		const accountTypes = await AccountType.find();

		res.status(200).json({
			message: `Тип счета ${isActive ? "активирован" : "деактивирован"}`,
			accountTypes,
		});
	} catch (e) {
		res.status(500).json({
			message: "Что-то пошло не так, попробуйте снова",
		});
	}
});

module.exports = router;
