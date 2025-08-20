import { APP } from "../../../constants";
import { setAlert, SHOW_ALERT_MESSAGE } from "../app";
import { setAnalyticsLoading } from "./set-analytics-loading";
import { setExpensesData } from "./set-expenses-data";

export const loadExpensesDataAsync = (request) => async (dispatch) => {
	try {
		dispatch(setAnalyticsLoading(true));

		const data = await request("/analytics/expenses");

		dispatch(setExpensesData(data));

		return;
	} catch (error) {
		const errorMessage = error || "Ошибка загрузки данных о расходах";

		dispatch(setAlert(errorMessage, APP.ALERT_ERROR));
		dispatch(SHOW_ALERT_MESSAGE);

		throw error;
	} finally {
		dispatch(setAnalyticsLoading(false));
	}
};
