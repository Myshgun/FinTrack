import { Chart } from "../../../../components";
import { Content } from "../../../../components";

export const Incomes = ({ className }) => {
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

	const incomeData = {
		datasets: [
			{
				label: "Доходы",
				data: [
					120, 150, 180, 135, 210, 190, 220, 230, 200, 250, 240, 300,
				],
			},
		],
		labels: months,
	};

	return (
		<Content className={className} title="Доходы" inside={true}>
			<Chart
				type="bar"
				{...incomeData}
				colors={["#94ffc9"]}
				darkMode={true}
				showLegend={false}
			/>
		</Content>
	);
};
