import { APP } from "../../../constants";
import { setAlert, SHOW_ALERT_MESSAGE } from "../app";
import { setAccountsData } from "./set-accounts-data";
import { setAccountsLoading } from "./set-accounts-loading";

export const loadAccountsAsync = (request) => async (dispatch) => {
	try {
		dispatch(setAccountsLoading(true));

		const data = await request("/accounts");

		dispatch(setAccountsData(data));

		return data.message;
	} catch (error) {
		const errorMessage = error || "Ошибка загрузки данных о счетах";

		dispatch(setAlert(errorMessage, APP.ALERT_ERROR));
		dispatch(SHOW_ALERT_MESSAGE);

		throw error;
	} finally {
		dispatch(setAccountsLoading(false));
	}
};
