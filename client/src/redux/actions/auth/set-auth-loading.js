import { ACTION_TYPE } from "../action-type";

export const setAuthLoading = (isLoading) => ({
	type: ACTION_TYPE.SET_AUTH_LOADING,
	payload: isLoading,
});
