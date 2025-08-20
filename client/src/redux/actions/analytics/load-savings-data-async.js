import { APP } from "../../../constants";
import { setAlert, SHOW_ALERT_MESSAGE } from "../app";
import { setAnalyticsLoading } from "./set-analytics-loading";
import { setSavingsData } from "./set-savings-data";

export const loadSavingsDataAsync = (request) => async (dispatch) => {
	try {
		dispatch(setAnalyticsLoading(true));

		const data = await request("/analytics/savings");

		dispatch(setSavingsData(data));

		return;
	} catch (error) {
		const errorMessage = error || "Ошибка загрузки данных о накоплениях";

		dispatch(setAlert(errorMessage, APP.ALERT_ERROR));
		dispatch(SHOW_ALERT_MESSAGE);

		throw error;
	} finally {
		dispatch(setAnalyticsLoading(false));
	}
};
