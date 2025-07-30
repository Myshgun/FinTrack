import { Chart } from "../../../../components";
import { Content } from "../../../../components";

export const Savings = ({ className }) => {
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

	const savingsData = {
		datasets: [
			{
				label: "Накопления",
				data: [
					125, 143, 168, 152, 175, 191, 208, 225, 243, 260, 278, 300,
				],
			},
		],
		labels: months,
	};

	return (
		<Content className={className} title="Накопления" inside={true}>
			<Chart
				type="line"
				{...savingsData}
				colors={["#4C84FF"]}
				darkMode={true}
				showLegend={false}
			/>
		</Content>
	);
};
