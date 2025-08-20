import { ACTION_TYPE } from "../action-type";

export const setAnalyticsLoading = (isLoading) => ({
	type: ACTION_TYPE.SET_ANALYTICS_LOADING,
	payload: isLoading,
});
