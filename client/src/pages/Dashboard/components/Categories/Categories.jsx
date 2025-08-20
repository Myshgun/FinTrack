import { useCallback, useEffect } from "react";
import { Chart, Loader } from "../../../../components";
import { Content } from "../../../../components";
import { useHttp } from "../../../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { selectAnalyticsCategories } from "../../../../redux/selectors";
import { loadCategoriesDataAsync } from "../../../../redux/actions";

export const Categories = ({ className }) => {
	const categoriesData = useSelector(selectAnalyticsCategories);

	const { request } = useHttp();
	const dispatch = useDispatch();

	const fetchCategoriesData = useCallback(async () => {
		dispatch(loadCategoriesDataAsync(request));
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
