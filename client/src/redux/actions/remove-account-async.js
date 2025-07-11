import { setAccountsData } from "./set-accounts-data";

export const removeAccountAsync = (request, id) => async (dispatch) => {
	try {
		const data = await request(`/accounts/${id}`, "DELETE");

		dispatch(setAccountsData(data.accounts));
		return data.message;
	} catch (error) {
		// Ошибка загрузки данных
	}
};
