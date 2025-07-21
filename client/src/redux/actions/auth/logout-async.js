import { LOGOUT } from "./logout";

export const logoutAsync = (request) => async (dispatch) => {
	try {
		const res = await request("/auth/logout", "POST");

		dispatch(LOGOUT);

		return res.message;
	} catch (error) {
		console.error("Ошибка логаута:", error);
		throw error;
	}
};
