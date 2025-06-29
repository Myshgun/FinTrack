import { ACTION_TYPE } from "./action-type";

export const authorize = (payload) => ({
	type: ACTION_TYPE.AUTHORIZE,
	payload,
});
