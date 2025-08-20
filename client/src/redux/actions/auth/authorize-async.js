import { APP } from "../../../constants";
import { setAlert, SHOW_ALERT_MESSAGE } from "../app";
import { setUser } from "../user";
import { authorize } from "./authorize";
import { setAuthLoading } from "./set-auth-loading";

export const authorizeAsync =
	(request, { email, password }) =>
	async (dispatch) => {
		try {
			dispatch(setAuthLoading(true));

			const { user, message } = await request("/auth/login", "POST", {
				email,
				password,
			});

			if (!user) {
				const errorMessage =
					"Произошла ошибка при авторизации. Попробуйте еще раз";
				dispatch(setAlert(errorMessage, APP.ALERT_ERROR));
				dispatch(SHOW_ALERT_MESSAGE);
				return;
			}

			dispatch(authorize(user.id));
			dispatch(setUser(user));

			dispatch(setAlert(message));
			dispatch(SHOW_ALERT_MESSAGE);

			return;
		} catch (error) {
			const errorMessage = error || "Ошибка при авторизации";

			dispatch(setAlert(errorMessage, APP.ALERT_ERROR));
			dispatch(SHOW_ALERT_MESSAGE);

			throw error;
		} finally {
			dispatch(setAuthLoading(false));
		}
	};
