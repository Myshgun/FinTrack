const { Router } = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");
const Account = require("../models/Account");
const router = Router();

/* /api/accounts */

router.get("/", auth, async (req, res) => {
	try {
		const accounts = await Account.find({ owner: req.user.userId });

		if (!accounts) {
			res.status(404).json({ message: "У вас нет счетов", accounts: [] });
		}

		res.status(200).json({ message: "Счета загружены", accounts });
	} catch (e) {
		res.status(500).json({
			message: "Что-то пошло не так, попробуйте снова",
		});
	}
});

router.post("/", auth, async (req, res) => {
	try {
		const { name, type } = req.body;

		if (!name || !type) {
			return res.status(400).json({ message: "Имя и тип обязательны" });
		}

		const existing = await Account.findOne({
			name,
			owner: req.user.userId,
		});

		if (existing) {
			return res
				.status(409)
				.json({ message: "Счет с таким именем уже есть" });
		}

		const account = new Account({ name, type, owner: req.user.userId });
		await account.save();

		const accounts = await Account.find({ owner: req.user.userId });

		res.status(201).json({ message: "Счет создан", accounts });
	} catch (e) {
		res.status(500).json({
			message: "Что-то пошло не так, попробуйте снова",
		});
	}
});

router.delete("/:id", auth, async (req, res) => {
	try {
		const account = await Account.findById(req.params.id);

		if (!account) {
			return res.status(404).json({ message: "Счет не найден" });
		}

		if (account.owner.toString() !== req.user.userId) {
			return res
				.status(403)
				.json({ message: "Недостаточно прав для удаления счета" });
		}

		await Account.findByIdAndDelete(req.params.id);

		const accounts = await Account.find({ owner: req.user.userId });

		res.status(200).json({ message: "Счет удален", accounts });
	} catch (e) {
		res.status(500).json({
			message: "Что-то пошло не так, попробуйте снова",
		});
	}
});

module.exports = router;
