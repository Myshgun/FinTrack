import { setUser } from "./set-user";

export const updateProfileAsync =
	(request, { id, ...newProfileData }) =>
	async (dispatch) => {
		try {
			const data = await request(`/user/${id}`, "PUT", {
				...newProfileData,
			});
			dispatch(setUser(data.user));
			return data.message;
		} catch (error) {
			// Ошибка загрузки пользовательских данных
			// Экшен для выхода из приложения
		}
	};
