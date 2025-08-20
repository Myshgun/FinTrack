import { APP } from "../../../constants";
import { setAlert, SHOW_ALERT_MESSAGE } from "../app";
import { setAnalyticsLoading } from "./set-analytics-loading";
import { setGrowthData } from "./set-growth-data";

export const loadGrowthDataAsync = (request) => async (dispatch) => {
	try {
		dispatch(setAnalyticsLoading(true));

		const data = await request("/analytics/growth");

		dispatch(setGrowthData(data));

		return;
	} catch (error) {
		const errorMessage = error || "Ошибка загрузки данных о бюджете";

		dispatch(setAlert(errorMessage, APP.ALERT_ERROR));
		dispatch(SHOW_ALERT_MESSAGE);

		throw error;
	} finally {
		dispatch(setAnalyticsLoading(false));
	}
};
