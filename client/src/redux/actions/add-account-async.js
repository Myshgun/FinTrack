import { setAccountsData } from "./set-accounts-data";

export const addAccountAsync =
	(request, newAccountData) => async (dispatch) => {
		try {
			const data = await request(`/accounts`, "POST", {
				...newAccountData,
			});
			dispatch(setAccountsData(data.accounts));
			return data.message;
		} catch (error) {
			// Ошибка загрузки пользовательских данных
			// Экшен для выхода из приложения
		}
	};
