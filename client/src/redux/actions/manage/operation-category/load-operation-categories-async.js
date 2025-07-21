import { setOperationCategoriesData } from "./set-operation-categories-data";

export const loadOperationCategoriesAsync = (request) => async (dispatch) => {
	try {
		const data = await request(`/manage/category`);
		dispatch(setOperationCategoriesData(data.operationCategories));
		return data.message;
	} catch (error) {
		// Ошибка загрузки пользовательских данных
		// Экшен для выхода из приложения
	}
};
