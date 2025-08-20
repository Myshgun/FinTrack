import { APP } from "../../../constants";
import { setAlert, SHOW_ALERT_MESSAGE } from "../app";
import { setAccountsData } from "./set-accounts-data";
import { setAccountsLoading } from "./set-accounts-loading";

export const removeAccountAsync = (request, id) => async (dispatch) => {
	try {
		dispatch(setAccountsLoading(true));

		const data = await request(`/accounts/${id}`, "DELETE");

		dispatch(setAccountsData(data.accounts));

		dispatch(setAlert(data.message));
		dispatch(SHOW_ALERT_MESSAGE);

		return;
	} catch (error) {
		const errorMessage = error || "Ошибка удаления счета";

		dispatch(setAlert(errorMessage, APP.ALERT_ERROR));
		dispatch(SHOW_ALERT_MESSAGE);

		throw error;
	} finally {
		dispatch(setAccountsLoading(false));
	}
};
