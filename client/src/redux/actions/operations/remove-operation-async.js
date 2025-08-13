export const removeOperationAsync = (request, id) => async () => {
	try {
		const { message } = await request(`/operations/${id}`, "DELETE");

		return message;
	} catch (error) {
		// Ошибка загрузки данных
	}
};
