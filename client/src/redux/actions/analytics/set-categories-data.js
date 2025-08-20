import { ACTION_TYPE } from "../action-type";

export const setCategoriesData = (data) => ({
	type: ACTION_TYPE.SET_CATEGORIES_DATA,
	payload: data,
});
