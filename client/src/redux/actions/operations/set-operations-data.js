import { ACTION_TYPE } from "../action-type";

export const setOperationsData = (operationsData) => ({
	type: ACTION_TYPE.SET_OPERATIONS_DATA,
	payload: operationsData,
});
