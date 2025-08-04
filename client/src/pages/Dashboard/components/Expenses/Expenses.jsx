import { useCallback, useEffect, useState } from "react";
import { Chart, Loader } from "../../../../components";
import { Content } from "../../../../components";
import { useHttp } from "../../../../hooks";
import { useDispatch } from "react-redux";
import { setAlertMessage, SHOW_ALERT_MESSAGE } from "../../../../redux/actions";

export const Expenses = ({ className }) => {
	const [expensesData, setExpensesData] = useState(null);
	const { request } = useHttp();
	const dispatch = useDispatch();

	const fetchExpensesData = useCallback(async () => {
		try {
			const data = await request("/analytics/expenses");

			setExpensesData(data);
		} catch (error) {
			dispatch(setAlertMessage(error.message));
			dispatch(SHOW_ALERT_MESSAGE);
		}
	}, [request, dispatch]);

	useEffect(() => {
		fetchExpensesData();
	}, [fetchExpensesData]);

	if (!expensesData) {
		return (
			<Content className={className} title="Расходы" inside={true}>
				<Loader />
			</Content>
		);
	}

	return (
		<Content className={className} title="Расходы" inside={true}>
			<Chart
				type="bar"
				{...expensesData}
				colors={["#ff6b6b"]}
				darkMode={true}
				showLegend={false}
			/>
		</Content>
	);
};
