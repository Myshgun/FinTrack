import { APP } from "../../../constants";
import { setAlert, SHOW_ALERT_MESSAGE } from "../app";
import { loadOperationsAsync } from "./load-operations-async";
import { setOperationsLoading } from "./set-operations-loading";

export const addOperationAsync =
	(request, newOperationData, limit) => async (dispatch) => {
		try {
			dispatch(setOperationsLoading(true));

			const data = await request(`/operations`, "POST", {
				...newOperationData,
			});

			dispatch(setAlert(data.message));
			dispatch(SHOW_ALERT_MESSAGE);

			dispatch(loadOperationsAsync(request, { page: 1, limit }));

			return;
		} catch (error) {
			const errorMessage = error || "Ошибка при добавлении счета";

			dispatch(setAlert(errorMessage, APP.ALERT_ERROR));
			dispatch(SHOW_ALERT_MESSAGE);

			throw error;
		} finally {
			dispatch(setOperationsLoading(false));
		}
	};
