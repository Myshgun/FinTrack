import { ACTION_TYPE } from "../action-type";

export const setBudgetData = (data) => ({
	type: ACTION_TYPE.SET_BUDGET_DATA,
	payload: data,
});
