import { ACTION_TYPE } from "../action-type";

export const setAccountsLoading = (isLoading) => ({
	type: ACTION_TYPE.SET_ACCOUNTS_LOADING,
	payload: isLoading,
});
