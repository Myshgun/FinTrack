import { Chart } from "../../../../components";
import { Content } from "../../../../components";

export const Growth = ({ className }) => {
	const growthData = {
		datasets: [
			{
				label: "Рост",
				data: [5.2, -1.8, 3.4, 7.1, -2.3, 4.6],
				barPercentage: 0.6,
			},
		],
		labels: ["Сент", "Окт", "Ноя", "Дек", "Янв", "Фев"],
	};

	return (
		<Content className={className} title="Индикатор роста" inside={true}>
			<Chart
				type="bar"
				{...growthData}
				colors={["#e3b0f8"]}
				darkMode={true}
				valueType="percent"
				showLegend={false}
			/>
		</Content>
	);
};
