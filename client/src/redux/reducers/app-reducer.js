import { ACTION_TYPE } from "../actions";

const initialAppState = {
	isAlertVisible: false,
	alertMessage: "",
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SHOW_ALERT_MESSAGE:
			return {
				...state,
				isAlertVisible: true,
			};
		case ACTION_TYPE.HIDE_ALERT_MESSAGE:
			return {
				...state,
				isAlertVisible: false,
			};
		case ACTION_TYPE.SET_ALERT_MESSAGE:
			return {
				...state,
				alertMessage: action.payload,
			};
		default:
			return state;
	}
};
