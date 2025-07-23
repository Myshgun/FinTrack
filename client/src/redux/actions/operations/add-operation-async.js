import { setAccountsData } from "../accounts";
import { setOperationsData } from "./set-operations-data";

export const addOperationAsync =
	(request, newOperationData) => async (dispatch) => {
		try {
			const data = await request(`/operations`, "POST", {
				...newOperationData,
			});

			dispatch(setOperationsData(data.operations));
			dispatch(setAccountsData(data.accounts));

			return data.message;
		} catch (error) {
			// Ошибка загрузки пользовательских данных
			// Экшен для выхода из приложения
		}
	};
