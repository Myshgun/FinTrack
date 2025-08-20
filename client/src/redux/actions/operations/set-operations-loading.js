import { ACTION_TYPE } from "../action-type";

export const setOperationsLoading = (isLoading) => ({
	type: ACTION_TYPE.SET_OPERATIONS_LOADING,
	payload: isLoading,
});
