import { ACTION_TYPE } from "../action-type";

export const setAlert = (message, type = "success") => ({
	type: ACTION_TYPE.SET_ALERT,
	payload: { message, type },
});
