import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chart, Loader } from "../../../../components";
import { Content } from "../../../../components";
import { useHttp } from "../../../../hooks";
import { loadSavingsDataAsync } from "../../../../redux/actions";
import { selectAnalyticsSavings } from "../../../../redux/selectors";

export const Savings = ({ className }) => {
	const savingsData = useSelector(selectAnalyticsSavings);

	const { request } = useHttp();
	const dispatch = useDispatch();

	const fetchSavingsData = useCallback(async () => {
		dispatch(loadSavingsDataAsync(request));
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
