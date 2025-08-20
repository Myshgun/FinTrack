import { useCallback, useEffect } from "react";
import { Chart, Loader } from "../../../../components";
import { Content } from "../../../../components";
import { useHttp } from "../../../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { loadGrowthDataAsync } from "../../../../redux/actions";
import { selectAnalyticsGrowth } from "../../../../redux/selectors";

export const Growth = ({ className }) => {
	const growthData = useSelector(selectAnalyticsGrowth);
	const { request } = useHttp();
	const dispatch = useDispatch();

	const fetchGrowthData = useCallback(async () => {
		dispatch(loadGrowthDataAsync(request));
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
