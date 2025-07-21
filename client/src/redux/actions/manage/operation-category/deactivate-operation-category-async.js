import { setOperationCategoriesData } from "./set-operation-categories-data";

export const toggleOperationCategoryActiveAsync =
	(request, id) => async (dispatch, getState) => {
		try {
			const isActive = getState().operationCategories.find(
				(item) => item.id === id
			)?.isActive;

			const data = await request(`/manage/category/${id}`, "PATCH", {
				isActive: !isActive,
			});

			dispatch(setOperationCategoriesData(data.operationCategories));

			return data.message;
		} catch (error) {
			console.error("Ошибка переключения статуса типа счета:", error);
			throw error;
		}
	};
