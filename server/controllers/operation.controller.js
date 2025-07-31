const Operation = require("../models/Operation");
const Account = require("../models/Account");
const OperationCategory = require("../models/OperationCategory");
const { OPERATION } = require("../constants/constants");

// Вспомогательная функция
async function updateAccountBalance(accountId) {
	const account = await Account.findById(accountId);
	if (!account) return;

	const operations = await Operation.find({
		account: accountId,
	}).populate("category");

	const balance = operations.reduce((sum, operation) => {
		const multiplier =
			operation.category?.direction === OPERATION.INCOME ? 1 : -1;
		return sum + operation.amount * multiplier;
	}, 0);

	account.balance = balance;
	await account.save();
}

// Получение всех операций пользователя
const getAllOperations = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const skip = (page - 1) * limit;

		const totalOperations = await Operation.countDocuments({
			owner: req.user.userId,
		});

		const operations = await Operation.find({
			owner: req.user.userId,
		})
			.populate("account")
			.populate("category")
			.sort({ date: -1, createdAt: -1 })
			.skip(skip)
			.limit(limit);

		res.status(200).json({
			message: "Операции загружены",
			operations,
			pagination: {
				total: totalOperations,
				page,
				pages: Math.ceil(totalOperations / limit),
				limit,
			},
		});
	} catch (e) {
		res.status(500).json({
			message: "Что-то пошло не так, попробуйте снова",
			error: e.message,
		});
	}
};

// Создание новой операции
const createOperation = async (req, res) => {
	try {
		const { account, amount, date, category, description } = req.body;

		if (!account || !amount || !date || !category) {
			return res.status(400).json({
				message: "Счет, сумма, дата и категория обязательны",
			});
		}

		const accountExists = await Account.findOne({
			_id: account,
			owner: req.user.userId,
		});
		if (!accountExists) {
			return res.status(404).json({
				message: "Счет не найден",
			});
		}

		const categoryExists = await OperationCategory.findOne({
			_id: category,
		});
		if (!categoryExists) {
			return res.status(404).json({
				message: "Категория не найдена",
			});
		}

		const operation = new Operation({
			account,
			amount: parseFloat(amount),
			date: new Date(date),
			category,
			description: description || "",
			owner: req.user.userId,
		});

		await operation.save();
		await updateAccountBalance(account);

		const operations = await Operation.find({
			owner: req.user.userId,
		})
			.populate("account")
			.populate("category")
			.sort({ date: -1, createdAt: -1 });

		const accounts = await Account.find({
			owner: req.user.userId,
		}).populate("type");

		res.status(201).json({
			message: `Операция создана`,
			operations,
			accounts,
		});
	} catch (e) {
		res.status(500).json({
			message: "Что-то пошло не так, попробуйте снова",
			error: e.message,
		});
	}
};

// Удаление операции
const deleteOperation = async (req, res) => {
	try {
		const operation = await Operation.findOne({
			_id: req.params.id,
			owner: req.user.userId,
		});

		if (!operation) {
			return res.status(404).json({
				message: "Операция не найдена",
			});
		}

		const accountId = operation.account;
		await operation.deleteOne();
		await updateAccountBalance(accountId);

		const operations = await Operation.find({
			owner: req.user.userId,
		})
			.populate("account")
			.populate("category")
			.sort({ date: -1, createdAt: -1 });

		const accounts = await Account.find({
			owner: req.user.userId,
		}).populate("type");

		res.status(200).json({
			message: "Операция удалена",
			operations,
			accounts,
		});
	} catch (e) {
		res.status(500).json({
			message: "Что-то пошло не так, попробуйте снова",
			error: e.message,
		});
	}
};

module.exports = {
	getAllOperations,
	createOperation,
	deleteOperation,
	updateAccountBalance,
};
