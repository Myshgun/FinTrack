const { Types } = require("mongoose");
const Operation = require("../models/Operation");
const OperationCategory = require("../models/OperationCategory");
const { DASHBOARD, OPERATION } = require("../constants/constants");

const getGrowthData = async (req, res) => {
	try {
		const { userId } = req.user;
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();
		const currentMonth = currentDate.getMonth();
		const monthsCount = 6;

		const incomeCategories = await OperationCategory.find({
			direction: OPERATION.INCOME,
		}).select("_id");
		const expenseCategories = await OperationCategory.find({
			direction: OPERATION.OUTCOME,
		}).select("_id");

		const monthsData = [];
		for (let i = monthsCount; i >= 0; i--) {
			const date = new Date(currentYear, currentMonth - i, 1);
			monthsData.push({
				year: date.getFullYear(),
				month: date.getMonth() + 1,
				name: DASHBOARD.MONTH_NAMES[date.getMonth()].substring(0, 3),
				income: 0,
				expense: 0,
			});
		}

		const incomeResults = await Operation.aggregate([
			{
				$match: {
					owner: new Types.ObjectId(userId),
					category: { $in: incomeCategories.map((c) => c._id) },
					date: {
						$gte: new Date(
							currentYear,
							currentMonth - monthsCount,
							1
						),
					},
				},
			},
			{
				$group: {
					_id: {
						year: { $year: "$date" },
						month: { $month: "$date" },
					},
					total: { $sum: "$amount" },
				},
			},
		]);

		const expenseResults = await Operation.aggregate([
			{
				$match: {
					owner: new Types.ObjectId(userId),
					category: { $in: expenseCategories.map((c) => c._id) },
					date: {
						$gte: new Date(
							currentYear,
							currentMonth - monthsCount,
							1
						),
					},
				},
			},
			{
				$group: {
					_id: {
						year: { $year: "$date" },
						month: { $month: "$date" },
					},
					total: { $sum: "$amount" },
				},
			},
		]);

		monthsData.forEach((month) => {
			const income = incomeResults.find(
				(r) => r._id.year === month.year && r._id.month === month.month
			);
			const expense = expenseResults.find(
				(r) => r._id.year === month.year && r._id.month === month.month
			);

			if (income) month.income = income.total;
			if (expense) month.expense = expense.total;
		});

		const result = {
			labels: [],
			datasets: [
				{
					label: "Рост",
					data: [],
					barPercentage: 0.6,
				},
			],
		};

		for (let i = 1; i < monthsData.length; i++) {
			const prevNet =
				monthsData[i - 1].income - monthsData[i - 1].expense;
			const currentNet = monthsData[i].income - monthsData[i].expense;

			const growth = prevNet !== 0 ? (currentNet / prevNet - 1) * 100 : 0;

			result.labels.push(monthsData[i].name);
			result.datasets[0].data.push(parseFloat(growth.toFixed(1)));
		}

		res.json(result);
	} catch (e) {
		res.status(500).json({
			message: "Ошибка при расчете индикатора роста",
			error: e.message,
		});
	}
};

module.exports = {
	getGrowthData,
};
