import { setAccountTypesData } from "./set-account-types-data";

export const toggleAccountTypeActiveAsync =
	(request, id) => async (dispatch, getState) => {
		try {
			const isActive = getState().accountTypes.find(
				(item) => item.id === id
			)?.isActive;

			const data = await request(`/manage/type/${id}`, "PATCH", {
				isActive: !isActive,
			});

			dispatch(setAccountTypesData(data.accountTypes));

			return data.message;
		} catch (error) {
			console.error("Ошибка переключения статуса типа счета:", error);
			throw error;
		}
	};
