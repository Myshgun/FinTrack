import { setOperationsData } from "./set-operations-data";

export const loadOperationsAsync =
	(request, { page = 1, limit = 10 } = {}) =>
	async (dispatch) => {
		try {
			const queryString = new URLSearchParams({ page, limit }).toString();
			const { message, operations, pagination } = await request(
				`/operations?${queryString}`
			);
			dispatch(setOperationsData({ operations, pagination }));
			return message;
		} catch (error) {
			// Ошибка загрузки пользовательских данных
			// Экшен для выхода из приложения
		}
	};
