import { APP } from "../../../constants";
import { setAlert, SHOW_ALERT_MESSAGE } from "../app";
import { setAccountsData } from "./set-accounts-data";
import { setAccountsLoading } from "./set-accounts-loading";

export const addAccountAsync =
	(request, newAccountData) => async (dispatch) => {
		try {
			dispatch(setAccountsLoading(true));

			const data = await request(`/accounts`, "POST", {
				...newAccountData,
			});

			dispatch(setAccountsData(data.accounts));

			dispatch(setAlert(data.message));
			dispatch(SHOW_ALERT_MESSAGE);

			return;
		} catch (error) {
			const errorMessage = error || "Ошибка при добавлении счета";

			dispatch(setAlert(errorMessage, APP.ALERT_ERROR));
			dispatch(SHOW_ALERT_MESSAGE);

			throw error;
		} finally {
			dispatch(setAccountsLoading(false));
		}
	};
