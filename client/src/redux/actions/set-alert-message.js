import { ACTION_TYPE } from "./action-type";

export const setAlertMessage = (message) => ({
	type: ACTION_TYPE.SET_ALERT_MESSAGE,
	payload: message,
});
