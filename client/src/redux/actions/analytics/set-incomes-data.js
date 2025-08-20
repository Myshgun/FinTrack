import { ACTION_TYPE } from "../action-type";

export const setIncomesData = (data) => ({
	type: ACTION_TYPE.SET_INCOMES_DATA,
	payload: data,
});
