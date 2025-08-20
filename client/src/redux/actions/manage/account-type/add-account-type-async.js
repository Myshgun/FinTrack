import { APP } from "../../../../constants";
import { setAlert, SHOW_ALERT_MESSAGE } from "../../app";
import { setAccountTypesData } from "./set-account-types-data";
import { setAccountTypesLoading } from "./set-account-types-loading";

export const addAccountTypeAsync =
	(request, newAccountTypeData) => async (dispatch) => {
		try {
			dispatch(setAccountTypesLoading(true));

			const data = await request(`/manage/type`, "POST", {
				...newAccountTypeData,
			});

			dispatch(setAccountTypesData(data.accountTypes));

			dispatch(setAlert(data.message));
			dispatch(SHOW_ALERT_MESSAGE);

			return;
		} catch (error) {
			const errorMessage =
				error || "Ошибка загрузки данных о типах счетов";

			dispatch(setAlert(errorMessage, APP.ALERT_ERROR));
			dispatch(SHOW_ALERT_MESSAGE);

			throw error;
		} finally {
			dispatch(setAccountTypesLoading(false));
		}
	};
