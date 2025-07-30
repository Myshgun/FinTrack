import { Chart } from "../../../../components";
import { Content } from "../../../../components";

export const Expenses = ({ className }) => {
	const months = [
		"Янв",
		"Фев",
		"Мар",
		"Апр",
		"Май",
		"Июн",
		"Июл",
		"Авг",
		"Сен",
		"Окт",
		"Ноя",
		"Дек",
	];

	const expenseData = {
		datasets: [
			{
				label: "Расходы",
				data: [
					80, 95, 110, 100, 120, 115, 130, 125, 110, 140, 135, 160,
				],
			},
		],
		labels: months,
	};

	return (
		<Content className={className} title="Расходы" inside={true}>
			<Chart
				type="bar"
				{...expenseData}
				colors={["#FF6384"]}
				darkMode={true}
				showLegend={false}
			/>
		</Content>
	);
};
