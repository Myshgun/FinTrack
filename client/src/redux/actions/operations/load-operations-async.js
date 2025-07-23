import { setOperationsData } from "./set-operations-data";

export const loadOperationsAsync = (request) => async (dispatch) => {
	try {
		const data = await request(`/operations`);
		dispatch(setOperationsData(data.operations));
		return data.message;
	} catch (error) {
		// Ошибка загрузки пользовательских данных
		// Экшен для выхода из приложения
	}
};
