import { APP } from "../../../constants";
import { setAlert, SHOW_ALERT_MESSAGE } from "../app";
import { setUser } from "./set-user";
import { setUserLoading } from "./set-user-loading";

export const updateProfileAsync =
	(request, { id, ...newProfileData }) =>
	async (dispatch) => {
		try {
			dispatch(setUserLoading(true));

			const data = await request(`/user/${id}`, "PUT", {
				...newProfileData,
			});

			dispatch(setUser(data.user));

			dispatch(setAlert(data.message));
			dispatch(SHOW_ALERT_MESSAGE);

			return;
		} catch (error) {
			const errorMessage =
				error || "Ошибка обновления данных о пользователе";

			dispatch(setAlert(errorMessage, APP.ALERT_ERROR));
			dispatch(SHOW_ALERT_MESSAGE);

			throw error;
		} finally {
			dispatch(setUserLoading(false));
		}
	};
