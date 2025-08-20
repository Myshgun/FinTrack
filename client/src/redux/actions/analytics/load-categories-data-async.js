import { APP } from "../../../constants";
import { setAlert, SHOW_ALERT_MESSAGE } from "../app";
import { setAnalyticsLoading } from "./set-analytics-loading";
import { setCategoriesData } from "./set-categories-data";

export const loadCategoriesDataAsync = (request) => async (dispatch) => {
	try {
		dispatch(setAnalyticsLoading(true));

		const data = await request("/analytics/expenses-by-category");

		dispatch(setCategoriesData(data));

		return;
	} catch (error) {
		const errorMessage =
			error || "Ошибка загрузки данных о расходах по категориям";

		dispatch(setAlert(errorMessage, APP.ALERT_ERROR));
		dispatch(SHOW_ALERT_MESSAGE);

		throw error;
	} finally {
		dispatch(setAnalyticsLoading(false));
	}
};
