const { Types } = require("mongoose");
const Operation = require("../models/Operation");
const { OPERATION } = require("../constants/constants");

const getExpensesByCategory = async (req, res) => {
	try {
		const { userId } = req.user;
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();

		const categoryExpenses = await Operation.aggregate([
			{
				$match: {
					owner: new Types.ObjectId(userId),
					date: {
						$gte: new Date(currentYear, 0, 1),
						$lte: currentDate,
					},
				},
			},
			{
				$lookup: {
					from: "operationcategories",
					localField: "category",
					foreignField: "_id",
					as: "category",
				},
			},
			{ $unwind: "$category" },
			{
				$match: {
					"category.direction": OPERATION.OUTCOME,
				},
			},
			{
				$group: {
					_id: "$category.description",
					amount: { $sum: "$amount" },
					color: { $first: "$category.color" },
				},
			},
			{ $sort: { amount: -1 } },
		]);

		const responseData = {
			labels: categoryExpenses.map((item) => item._id),
			datasets: [
				{
					data: categoryExpenses.map((item) => item.amount),
					backgroundColor: categoryExpenses.map((item) => item.color),
					borderColor: "#1e1e1e",
					borderWidth: 1,
				},
			],
		};

		res.json(responseData);
	} catch (e) {
		res.status(500).json({
			message: "Ошибка при расчете расходов по категориям",
			error: e.message,
		});
	}
};

module.exports = {
	getExpensesByCategory,
};
