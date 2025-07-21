import { setAccountTypesData } from "./set-account-types-data";

export const loadAccountTypesAsync = (request) => async (dispatch) => {
	try {
		const data = await request(`/manage/type`);
		dispatch(setAccountTypesData(data.accountTypes));
		return data.message;
	} catch (error) {
		// Ошибка загрузки пользовательских данных
		// Экшен для выхода из приложения
	}
};
