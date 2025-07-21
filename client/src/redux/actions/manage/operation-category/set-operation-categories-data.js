import { ACTION_TYPE } from "../../action-type";

export const setOperationCategoriesData = (operationCategoriesData) => ({
	type: ACTION_TYPE.SET_OPERATION_CATEGORIES_DATA,
	payload: operationCategoriesData,
});
