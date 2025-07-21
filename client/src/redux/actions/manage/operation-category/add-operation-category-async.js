import { setOperationCategoriesData } from "./set-operation-categories-data";

export const addOperationCategoryAsync =
	(request, newOperationCategoryData) => async (dispatch) => {
		try {
			const data = await request(`/manage/category`, "POST", {
				...newOperationCategoryData,
			});
			dispatch(setOperationCategoriesData(data.operationCategories));
			return data.message;
		} catch (error) {
			// Ошибка загрузки пользовательских данных
			// Экшен для выхода из приложения
		}
	};
