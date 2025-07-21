import { ACTION_TYPE } from "../../action-type";

export const setAccountTypesData = (accountTypesData) => ({
	type: ACTION_TYPE.SET_ACCOUNT_TYPES_DATA,
	payload: accountTypesData,
});
