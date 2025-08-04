import { useCallback, useEffect, useState } from "react";
import { Chart, Loader } from "../../../../components";
import { Content } from "../../../../components";
import { useHttp } from "../../../../hooks";
import { useDispatch } from "react-redux";
import { setAlertMessage, SHOW_ALERT_MESSAGE } from "../../../../redux/actions";

export const Incomes = ({ className }) => {
	const [incomesData, setIncomesData] = useState(null);
	const { request } = useHttp();
	const dispatch = useDispatch();

	const fetchIncomesData = useCallback(async () => {
		try {
			const data = await request("/analytics/incomes");

			setIncomesData(data);
		} catch (error) {
			dispatch(setAlertMessage(error.message));
			dispatch(SHOW_ALERT_MESSAGE);
		}
	}, [request, dispatch]);

	useEffect(() => {
		fetchIncomesData();
	}, [fetchIncomesData]);

	if (!incomesData) {
		return (
			<Content className={className} title="Доходы" inside={true}>
				<Loader />
			</Content>
		);
	}

	console.log(incomesData);

	return (
		<Content className={className} title="Доходы" inside={true}>
			<Chart
				type="bar"
				{...incomesData}
				colors={["#94ffc9"]}
				darkMode={true}
				showLegend={false}
			/>
		</Content>
	);
};
