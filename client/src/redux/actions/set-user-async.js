import { setUser } from "./set-user";

export const setUserAsync = (request) => async (dispatch, getState) => {
	const token = getState().auth.token || localStorage.getItem("token");

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
