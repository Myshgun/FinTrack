const { Types } = require("mongoose");
const Operation = require("../models/Operation");
const { DASHBOARD, OPERATION } = require("../constants/constants");

const getIncomesData = async (req, res) => {
	try {
		const { userId } = req.user;
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();
		const currentMonth = currentDate.getMonth();

		const monthlyIncomes = await Operation.aggregate([
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
					"category.direction": OPERATION.INCOME,
				},
			},
			{
				$group: {
					_id: { $month: "$date" },
					amount: { $sum: "$amount" },
				},
			},
			{ $sort: { _id: 1 } },
		]);

		const monthlyData = Array(12).fill(0);
		monthlyIncomes.forEach((month) => {
			monthlyData[month._id - 1] = month.amount;
		});

		res.json({
			labels: DASHBOARD.MONTH_NAMES.slice(0, currentMonth + 1),
			datasets: [
				{
					label: "Доходы",
					data: monthlyData.slice(0, currentMonth + 1),
					backgroundColor: "#94ffc9",
					borderColor: "#94ffc9",
					borderWidth: 1,
				},
			],
		});
	} catch (e) {
		res.status(500).json({
			message: "Ошибка при расчете доходов",
			error: e.message,
		});
	}
};

module.exports = {
	getIncomesData,
};
