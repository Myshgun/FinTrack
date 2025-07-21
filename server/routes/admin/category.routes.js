const { Router } = require("express");
const OperationCategory = require("../../models/OperationCategory");
const User = require("../../models/User");
const auth = require("../../middleware/auth.middleware");
const hasRole = require("../../middleware/role.middleware");
const { ROLE } = require("../../constants/constants");
const router = Router();

/* /api/manage/category */

router.get("/", auth, async (req, res) => {
	try {
		const operationCategories = await OperationCategory.find();

		if (!operationCategories) {
			res.status(404).json({
				message: "Категории операций отсутствуют",
				operationCategories: [],
			});
		}

		const user = await User.findById(req.user.userId);

		if (user.roleId !== ROLE.ADMIN) {
			const filteredOperationCategories = operationCategories.filter(
				(type) => type.isActive === true
			);
			res.status(200).json({
				message: "Категории операций загружены для пользователя",
				operationCategories: filteredOperationCategories,
			});
			return;
		}

		res.status(200).json({
			message: "Все категории операций счетов загружены",
			operationCategories,
		});
	} catch (e) {
		res.status(500).json({
			message: "Что-то пошло не так, попробуйте снова",
		});
	}
});

router.post("/", auth, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const { type, description, color, direction } = req.body;

		if (!type || !description || !color || !direction) {
			return res
				.status(400)
				.json({ message: "Необходимо указать тип, описание и цвет" });
		}

		const existing = await OperationCategory.findOne({ type });
		if (existing) {
			return res.status(409).json({
				message: "Категория операции с таким именем уже существует",
			});
		}

		const newCategory = new OperationCategory({
			type,
			description,
			color,
			direction,
		});
		await newCategory.save();

		const operationCategories = await OperationCategory.find();

		res.status(201).json({
			message: "Категория операции создана",
			operationCategories,
		});
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

		const category = await OperationCategory.findById(req.params.id);
		if (!category) {
			return res
				.status(404)
				.json({ message: "Категория операции не найдена" });
		}

		if (isActive === false) {
			const accountsUsingСategory =
				await require("../../models/Account").countDocuments({
					category: category._id,
				});
			if (accountsUsingСategory > 0) {
				return res.status(400).json({
					message:
						"Нельзя деактивировать категорию операции, пока есть операции с этим типом",
				});
			}
		}

		category.isActive = isActive;
		await category.save();

		const operationCategories = await OperationCategory.find();

		res.status(200).json({
			message: `Категория операции ${
				isActive ? "активирована" : "деактивирована"
			}`,
			operationCategories,
		});
	} catch (e) {
		res.status(500).json({
			message: "Что-то пошло не так, попробуйте снова",
		});
	}
});

module.exports = router;
