const { Types } = require("mongoose");
const Account = require("../models/Account");

const getBudgetData = async (req, res) => {
	try {
		const { userId } = req.user;

		const accounts = await Account.find({
			owner: new Types.ObjectId(userId),
		})
			.populate("type")
			.select("name balance type");

		const totalBudget = accounts.reduce((sum, acc) => sum + acc.balance, 0);

		const budgetData = {
			accounts: accounts.map((acc) => ({
				name: acc.name,
				balance: acc.balance,
				type: acc.type?.description || "Другой",
			})),
			total: totalBudget,
		};

		res.json(budgetData);
	} catch (e) {
		res.status(500).json({
			message: "Ошибка при загрузке данных бюджета",
			error: e.message,
		});
	}
};

module.exports = {
	getBudgetData,
};
