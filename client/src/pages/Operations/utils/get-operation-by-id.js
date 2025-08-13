export const getOperationById = (operations, id) =>
	operations.find((operation) => operation.id === id);
