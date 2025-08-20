import { ACTION_TYPE } from "../action-type";

export const setSavingsData = (data) => ({
	type: ACTION_TYPE.SET_SAVINGS_DATA,
	payload: data,
});
