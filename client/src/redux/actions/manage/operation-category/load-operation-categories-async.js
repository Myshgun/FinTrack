import { APP } from "../../../../constants";
import { setAlert, SHOW_ALERT_MESSAGE } from "../../app";
import { setOperationCategoriesData } from "./set-operation-categories-data";
import { setOperationCategoriesLoading } from "./set-operation-categories-loading";

export const loadOperationCategoriesAsync = (request) => async (dispatch) => {
	try {
		dispatch(setOperationCategoriesLoading(true));

		const data = await request(`/manage/category`);

		dispatch(setOperationCategoriesData(data.operationCategories));

		return;
	} catch (error) {
		const errorMessage =
			error || "Ошибка загрузки данных о категориях операций";

		dispatch(setAlert(errorMessage, APP.ALERT_ERROR));
		dispatch(SHOW_ALERT_MESSAGE);

		throw error;
	} finally {
		dispatch(setOperationCategoriesLoading(false));
	}
};
