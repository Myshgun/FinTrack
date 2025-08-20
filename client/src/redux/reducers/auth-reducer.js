import { ACTION_TYPE } from "../actions";

const initialAuthState = {
	userId: null,
	isAuthenticated: false,
	isAuthChecked: false,
	isLoading: false,
};

export const authReducer = (state = initialAuthState, action) => {
	switch (action.type) {
		case ACTION_TYPE.AUTHORIZE:
			return {
				...state,
				userId: action.payload,
				isAuthenticated: true,
				isAuthChecked: true,
				isLoading: false,
			};
		case ACTION_TYPE.SET_AUTH_CHECKED:
			return {
				...state,
				isAuthChecked: true,
			};
		case ACTION_TYPE.LOGOUT:
			return {
				...initialAuthState,
				isAuthChecked: true,
			};
		case ACTION_TYPE.SET_AUTH_LOADING:
			return {
				...state,
				isLoading: action.payload,
			};
		default:
			return state;
	}
};
