import { ACTION_TYPE } from "./action-type";

export const setAccountsData = (accountsData) => ({
	type: ACTION_TYPE.SET_ACCOUNTS_DATA,
	payload: accountsData,
});
