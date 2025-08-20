import { useCallback, useEffect } from "react";
import { Chart, Loader } from "../../../../components";
import { Content } from "../../../../components";
import { useHttp } from "../../../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { loadExpensesDataAsync } from "../../../../redux/actions";
import { selectAnalyticsExpenses } from "../../../../redux/selectors";

export const Expenses = ({ className }) => {
	const expensesData = useSelector(selectAnalyticsExpenses);
	const { request } = useHttp();
	const dispatch = useDispatch();

	const fetchExpensesData = useCallback(async () => {
		dispatch(loadExpensesDataAsync(request));
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
