import { APP } from "../../constants";
import { ACTION_TYPE } from "../actions";

const rawUserData = localStorage.getItem(APP.USER_DATA_STORAGE);
const userData = rawUserData ? JSON.parse(rawUserData) : null;

const initialAuthState = {
	token: userData?.token || null,
	userId: userData?.userId || null,
	isAuthenticated: !!userData,
};

export const authReducer = (state = initialAuthState, action) => {
	switch (action.type) {
		case ACTION_TYPE.AUTHORIZE:
			return {
				...state,
				token: action.payload.token,
				userId: action.payload.userId,
				isAuthenticated: true,
			};
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				token: null,
				userId: null,
				isAuthenticated: false,
			};
		default:
			return state;
	}
};
