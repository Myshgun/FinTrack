import { ACTION_TYPE } from "../action-type";

export const setExpensesData = (data) => ({
	type: ACTION_TYPE.SET_EXPENSES_DATA,
	payload: data,
});
