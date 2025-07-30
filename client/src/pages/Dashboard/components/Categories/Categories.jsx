import { Chart } from "../../../../components";
import { Content } from "../../../../components";

export const Categories = ({ className }) => {
	const categoriesData = {
		datasets: [
			{
				data: [35, 25, 15, 15, 10],
			},
		],
		labels: ["Еда", "Жилье", "Транспорт", "Развлечения", "Другое"],
	};

	return (
		<Content
			className={className}
			title="Расходы по категориям"
			inside={true}
		>
			<Chart
				type="pie"
				{...categoriesData}
				colors={["#FF6384", "#FFA040", "#FFCE56", "#4C84FF", "#36A2EB"]}
				darkMode={true}
			/>
		</Content>
	);
};
