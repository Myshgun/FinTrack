import { setUser } from "./set-user";

export const setUserAsync = (request) => async (dispatch, getState) => {
	const token = getState().auth.token;

	if (!token) {
		// Ошибка загрузки пользовательских данных
	}

	try {
		const data = await request("/user", "GET");

		dispatch(setUser(data));
	} catch (error) {
		// Ошибка загрузки пользовательских данных
		// Экшен для выхода из приложения
	}
};
