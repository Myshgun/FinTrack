import { setAccountTypesData } from "./set-account-types-data";

export const addAccountTypeAsync =
	(request, newAccountTypeData) => async (dispatch) => {
		try {
			const data = await request(`/manage/type`, "POST", {
				...newAccountTypeData,
			});
			dispatch(setAccountTypesData(data.accountTypes));
			return data.message;
		} catch (error) {
			// Ошибка загрузки пользовательских данных
			// Экшен для выхода из приложения
		}
	};
