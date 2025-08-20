import { APP } from "../../../../constants";
import { setAlert, SHOW_ALERT_MESSAGE } from "../../app";
import { setAccountTypesData } from "./set-account-types-data";
import { setAccountTypesLoading } from "./set-account-types-loading";

export const toggleAccountTypeActiveAsync =
	(request, id) => async (dispatch, getState) => {
		try {
			dispatch(setAccountTypesLoading(true));

			const isActive = getState().accountTypes.find(
				(item) => item.id === id
			)?.isActive;

			const data = await request(`/manage/type/${id}`, "PATCH", {
				isActive: !isActive,
			});

			dispatch(setAccountTypesData(data.accountTypes));

			dispatch(setAlert(data.message));
			dispatch(SHOW_ALERT_MESSAGE);

			return;
		} catch (error) {
			const errorMessage =
				error || "Ошибка переключения статуса типа счета";

			dispatch(setAlert(errorMessage, APP.ALERT_ERROR));
			dispatch(SHOW_ALERT_MESSAGE);

			throw error;
		} finally {
			dispatch(setAccountTypesLoading(false));
		}
	};
