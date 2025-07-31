import { ACTION_TYPE } from "../action-type";

export const setOperationsData = (data) => ({
	type: ACTION_TYPE.SET_OPERATIONS_DATA,
	payload: {
		operations: data.operations,
		pagination: data.pagination,
	},
});
