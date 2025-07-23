import { setAccountsData } from "../accounts";
import { setOperationsData } from "./set-operations-data";

export const removeOperationAsync = (request, id) => async (dispatch) => {
	try {
		const data = await request(`/operations/${id}`, "DELETE");

		dispatch(setOperationsData(data.operations));
		dispatch(setAccountsData(data.accounts));

		return data.message;
	} catch (error) {
		// Ошибка загрузки данных
	}
};
