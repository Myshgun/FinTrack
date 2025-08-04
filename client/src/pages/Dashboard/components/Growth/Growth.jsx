// import { Chart } from "../../../../components";
// import { Content } from "../../../../components";

// export const Growth = ({ className }) => {
// 	const growthData = {
// 		datasets: [
// 			{
// 				label: "Рост",
// 				data: [5.2, -1.8, 3.4, 7.1, -2.3, 4.6],
// 				barPercentage: 0.6,
// 			},
// 		],
// 		labels: ["Сент", "Окт", "Ноя", "Дек", "Янв", "Фев"],
// 	};

// 	return (
// 		<Content className={className} title="Индикатор роста" inside={true}>
// 			<Chart
// 				type="bar"
// 				{...growthData}
// 				colors={["#e3b0f8"]}
// 				darkMode={true}
// 				valueType="percent"
// 				showLegend={false}
// 			/>
// 		</Content>
// 	);
// };

import { useCallback, useEffect, useState } from "react";
import { Chart, Loader } from "../../../../components";
import { Content } from "../../../../components";
import { useHttp } from "../../../../hooks";
import { useDispatch } from "react-redux";
import { setAlertMessage, SHOW_ALERT_MESSAGE } from "../../../../redux/actions";

export const Growth = ({ className }) => {
	const [growthData, setGrowthData] = useState(null);
	const { request } = useHttp();
	const dispatch = useDispatch();

	const fetchGrowthData = useCallback(async () => {
		try {
			const data = await request("/analytics/growth");
			setGrowthData(data);
		} catch (error) {
			dispatch(setAlertMessage(error.message));
			dispatch(SHOW_ALERT_MESSAGE);
		}
	}, [request, dispatch]);

	useEffect(() => {
		fetchGrowthData();
	}, [fetchGrowthData]);

	if (!growthData) {
		return (
			<Content
				className={className}
				title="Индикатор роста"
				inside={true}
			>
				<Loader />
			</Content>
		);
	}

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
