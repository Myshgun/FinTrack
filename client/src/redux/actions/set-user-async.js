import { setUser } from "./set-user";
import { APP } from "../../constants";

export const setUserAsync = (request) => async (dispatch, getState) => {
	const token =
		getState().auth.token ||
		localStorage.getItem(APP.USER_DATA_STORAGE.token);

	if (!token) {
		// Ошибка загрузки пользовательских данных
	}

	try {
		const data = await request("/user", "GET", null, {
			Authorization: `Bearer ${token}`,
		});

		dispatch(setUser(data));
	} catch (error) {
		// Ошибка загрузки пользовательских данных
		// Экшен для выхода из приложения
	}
};
