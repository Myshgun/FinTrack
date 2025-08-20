import { APP } from "../../../../constants";
import { setAlert, SHOW_ALERT_MESSAGE } from "../../app";
import { setOperationCategoriesData } from "./set-operation-categories-data";
import { setOperationCategoriesLoading } from "./set-operation-categories-loading";

export const toggleOperationCategoryActiveAsync =
	(request, id) => async (dispatch, getState) => {
		try {
			dispatch(setOperationCategoriesLoading(true));

			const isActive = getState().operationCategories.find(
				(item) => item.id === id
			)?.isActive;

			const data = await request(`/manage/category/${id}`, "PATCH", {
				isActive: !isActive,
			});

			dispatch(setOperationCategoriesData(data.operationCategories));

			dispatch(setAlert(data.message));
			dispatch(SHOW_ALERT_MESSAGE);

			return;
		} catch (error) {
			const errorMessage =
				error || "Ошибка переключения статуса категории операции";

			dispatch(setAlert(errorMessage, APP.ALERT_ERROR));
			dispatch(SHOW_ALERT_MESSAGE);

			throw error;
		} finally {
			dispatch(setOperationCategoriesLoading(false));
		}
	};
