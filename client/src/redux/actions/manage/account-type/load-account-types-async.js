import { APP } from "../../../../constants";
import { setAlert, SHOW_ALERT_MESSAGE } from "../../app";
import { setAccountTypesData } from "./set-account-types-data";
import { setAccountTypesLoading } from "./set-account-types-loading";

export const loadAccountTypesAsync = (request) => async (dispatch) => {
	try {
		dispatch(setAccountTypesLoading(true));

		const data = await request(`/manage/type`);

		dispatch(setAccountTypesData(data.accountTypes));

		return;
	} catch (error) {
		const errorMessage = error || "Ошибка загрузки данных о типах счетов";

		dispatch(setAlert(errorMessage, APP.ALERT_ERROR));
		dispatch(SHOW_ALERT_MESSAGE);

		throw error;
	} finally {
		dispatch(setAccountTypesLoading(false));
	}
};
