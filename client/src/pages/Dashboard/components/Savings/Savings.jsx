import { useCallback, useEffect, useState } from "react";
import { Chart, Loader } from "../../../../components";
import { Content } from "../../../../components";
import { useHttp } from "../../../../hooks";

export const Savings = ({ className }) => {
	const [savingsData, setSavingsData] = useState(null);
	const { request } = useHttp();

	const fetchSavingsData = useCallback(async () => {
		try {
			const data = await request("/analytics/savings");
			console.log(data);
			setSavingsData(data);
		} catch (error) {
			console.error("Ошибка при загрузке данных:", error.message);
		}
	}, [request]);

	useEffect(() => {
		fetchSavingsData();
	}, [fetchSavingsData]);

	if (!savingsData) {
		return (
			<Content className={className} title="Накопления" inside={true}>
				<Loader />
			</Content>
		);
	}

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
