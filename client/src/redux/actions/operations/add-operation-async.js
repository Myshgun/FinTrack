export const addOperationAsync = (request, newOperationData) => async () => {
	try {
		const data = await request(`/operations`, "POST", {
			...newOperationData,
		});

		return data.message;
	} catch (error) {
		// Ошибка загрузки пользовательских данных
		// Экшен для выхода из приложения
	}
};
