import { ACTION_TYPE } from "../action-type";

export const setUserLoading = (isLoading) => ({
	type: ACTION_TYPE.SET_USER_LOADING,
	payload: isLoading,
});
