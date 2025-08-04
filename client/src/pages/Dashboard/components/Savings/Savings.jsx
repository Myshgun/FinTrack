import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Chart, Loader } from "../../../../components";
import { Content } from "../../../../components";
import { useHttp } from "../../../../hooks";
import { setAlertMessage, SHOW_ALERT_MESSAGE } from "../../../../redux/actions";

export const Savings = ({ className }) => {
	const [savingsData, setSavingsData] = useState(null);
	const { request } = useHttp();
	const dispatch = useDispatch();

	const fetchSavingsData = useCallback(async () => {
		try {
			const data = await request("/analytics/savings");
			setSavingsData(data);
		} catch (error) {
			dispatch(setAlertMessage(error.message));
			dispatch(SHOW_ALERT_MESSAGE);
		}
	}, [request, dispatch]);

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

	console.log(savingsData);

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
