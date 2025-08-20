import { ACTION_TYPE } from "../../action-type";

export const setAccountTypesLoading = (isLoading) => ({
	type: ACTION_TYPE.SET_ACCOUNT_TYPES_LOADING,
	payload: isLoading,
});
