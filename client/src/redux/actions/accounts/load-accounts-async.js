import { setAccountsData } from "./set-accounts-data";

export const loadAccountsAsync = (request) => async (dispatch) => {
	try {
		const data = await request(`/accounts`);
		dispatch(setAccountsData(data.accounts));
		return data.message;
	} catch (error) {
		// Ошибка загрузки пользовательских данных
		// Экшен для выхода из приложения
	}
};
