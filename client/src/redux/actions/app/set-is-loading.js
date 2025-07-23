import { ACTION_TYPE } from "../action-type";

export const setIsLoading = (isLoading) => ({
	type: ACTION_TYPE.SET_IS_LOADING,
	payload: isLoading,
});
