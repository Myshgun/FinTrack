import { setUser } from "./set-user";
import { APP } from "../../constants";

export const updateProfileAsync =
	(request, { id, ...newProfileData }) =>
	async (dispatch, getState) => {
		const token =
			getState().auth.token ||
			localStorage.getItem(APP.USER_DATA_STORAGE.token);

		if (!token) {
			// Ошибка авторизации
		}

		try {
			const data = await request(
				`/user/${id}`,
				"PUT",
				{ ...newProfileData },
				{
					Authorization: `Bearer ${token}`,
				}
			);
			dispatch(setUser(data.user));
			return data.message;
		} catch (error) {
			// Ошибка загрузки пользовательских данных
			// Экшен для выхода из приложения
		}
	};
