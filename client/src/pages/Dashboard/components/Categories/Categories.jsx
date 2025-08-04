import { useCallback, useEffect, useState } from "react";
import { Chart, Loader } from "../../../../components";
import { Content } from "../../../../components";
import { useHttp } from "../../../../hooks";
import { useDispatch } from "react-redux";
import { setAlertMessage, SHOW_ALERT_MESSAGE } from "../../../../redux/actions";

export const Categories = ({ className }) => {
	const [categoriesData, setCategoriesData] = useState(null);
	const { request } = useHttp();
	const dispatch = useDispatch();

	const fetchCategoriesData = useCallback(async () => {
		try {
			const data = await request("/analytics/expenses-by-category");
			setCategoriesData(data);
		} catch (error) {
			dispatch(setAlertMessage(error.message));
			dispatch(SHOW_ALERT_MESSAGE);
		}
	}, [request, dispatch]);

	useEffect(() => {
		fetchCategoriesData();
	}, [fetchCategoriesData]);

	if (!categoriesData) {
		return (
			<Content
				className={className}
				title="Расходы по категориям"
				inside={true}
			>
				<Loader />
			</Content>
		);
	}

	return (
		<Content
			className={className}
			title="Расходы по категориям"
			inside={true}
		>
			<Chart
				type="pie"
				{...categoriesData}
				colors={categoriesData.datasets[0].backgroundColor}
				darkMode={true}
			/>
		</Content>
	);
};
