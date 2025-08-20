import { APP } from "../../../constants";
import { setAlert, SHOW_ALERT_MESSAGE } from "../app";
import { setAuthLoading } from "./set-auth-loading";

export const registerAsync =
	(request, { email, password }) =>
	async (dispatch) => {
		try {
			dispatch(setAuthLoading(true));

			const data = await request("/auth/register", "POST", {
				email,
				password,
			});

			dispatch(setAlert(data.message));
			dispatch(SHOW_ALERT_MESSAGE);

			return;
		} catch (error) {
			const errorMessage = error || "Ошибка при регистрации";

			dispatch(setAlert(errorMessage, APP.ALERT_ERROR));
			dispatch(SHOW_ALERT_MESSAGE);

			throw error;
		} finally {
			dispatch(setAuthLoading(false));
		}
	};
