import { ACTION_TYPE } from "../../action-type";

export const setOperationCategoriesLoading = (isLoading) => ({
	type: ACTION_TYPE.SET_OPERATION_CATEGORIES_LOADING,
	payload: isLoading,
});
