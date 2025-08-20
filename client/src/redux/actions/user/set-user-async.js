import { APP } from "../../../constants";
import { setAlert, SHOW_ALERT_MESSAGE } from "../app";
import { setUser } from "./set-user";
import { setUserLoading } from "./set-user-loading";

export const setUserAsync = (request) => async (dispatch) => {
	try {
		dispatch(setUserLoading(true));

		const data = await request("/user", "GET");

		dispatch(setUser(data));

		return;
	} catch (error) {
		const errorMessage = error || "Ошибка загрузки данных пользователя";

		dispatch(setAlert(errorMessage, APP.ALERT_ERROR));
		dispatch(SHOW_ALERT_MESSAGE);

		throw error;
	} finally {
		dispatch(setUserLoading(false));
	}
};
