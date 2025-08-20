import { ACTION_TYPE } from "../action-type";

export const setGrowthData = (data) => ({
	type: ACTION_TYPE.SET_GROWTH_DATA,
	payload: data,
});
