const { Types } = require("mongoose");

const Operation = require("../models/Operation");
const { DASHBOARD } = require("../constants/constants");

const getSavingsData = async (req, res) => {
	try {
		const { userId } = req.user;
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();
		const currentMonth = currentDate.getMonth();

		const initialBalance = await Operation.aggregate([
			{
				$match: {
					owner: new Types.ObjectId(userId),
					date: { $lt: new Date(currentYear, 0, 1) },
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
				$group: {
					_id: null,
					total: {
						$sum: {
							$cond: [
								{ $eq: ["$category.direction", "001"] }, // 001 - накопление
								"$amount",
								{ $multiply: ["$amount", -1] }, // 002 - трата
							],
						},
					},
				},
			},
		]);

		const startBalance = initialBalance[0]?.total || 0;

		const monthlyData = await Operation.aggregate([
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
				$group: {
					_id: { $month: "$date" },
					total: {
						$sum: {
							$cond: [
								{ $eq: ["$category.direction", "001"] },
								"$amount",
								{ $multiply: ["$amount", -1] },
							],
						},
					},
				},
			},
			{ $sort: { _id: 1 } },
		]);

		const result = [];
		let cumulative = startBalance;

		for (let month = 0; month <= currentMonth; month++) {
			const monthData = monthlyData.find((d) => d._id === month + 1);
			cumulative += monthData?.total || 0;
			result.push(cumulative);
		}

		res.json({
			labels: DASHBOARD.MONTH_NAMES.slice(0, currentMonth + 1),
			datasets: [
				{
					label: "Накопления",
					data: result,
					borderColor: "#4C84FF",
					fill: true,
					tension: 0.1,
				},
			],
		});
	} catch (e) {
		res.status(500).json({
			message: "Ошибка при расчете накоплений",
			error: e.message,
		});
	}
};

module.exports = {
	getSavingsData,
};
