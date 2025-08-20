import { useCallback, useEffect } from "react";
import { Chart, Loader } from "../../../../components";
import { Content } from "../../../../components";
import { useHttp } from "../../../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { loadIncomesDataAsync } from "../../../../redux/actions";
import { selectAnalyticsIncomes } from "../../../../redux/selectors";

export const Incomes = ({ className }) => {
	const incomesData = useSelector(selectAnalyticsIncomes);
	const { request } = useHttp();
	const dispatch = useDispatch();

	const fetchIncomesData = useCallback(async () => {
		dispatch(loadIncomesDataAsync(request));
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
